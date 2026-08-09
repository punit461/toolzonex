import { useEffect, useRef, useState } from 'react'
import { classifyDetectionSample, createClassifierState, flushClassifier, type ClassifierState } from './distractionClassifier'
import type { DetectionSample } from './detectionTypes'
import type { DistractionEvent } from '../types/session'

export type CameraStatus = 'idle' | 'requesting' | 'active' | 'denied' | 'unavailable' | 'error'

interface UseCameraMonitoringOptions {
  enabled: boolean
  sampleIntervalSec?: number
  onEvent: (event: DistractionEvent) => void
}

function createHiddenVideoElement(): HTMLVideoElement {
  const video = document.createElement('video')
  video.muted = true
  video.playsInline = true
  video.setAttribute('aria-hidden', 'true')
  // Positioned off-screen rather than display:none/visibility:hidden — both
  // of those can make browsers stop decoding frames for a <video>, which
  // silently starves detection of any real image data. It must stay in the
  // document to reliably keep decoding.
  Object.assign(video.style, {
    position: 'fixed',
    top: '-9999px',
    left: '-9999px',
    width: '1px',
    height: '1px',
  })
  document.body.appendChild(video)
  return video
}

async function waitForFirstFrame(video: HTMLVideoElement): Promise<void> {
  if (video.readyState >= video.HAVE_CURRENT_DATA) return
  await new Promise<void>((resolve) => {
    video.addEventListener('loadeddata', () => resolve(), { once: true })
  })
}

/** Runs face/hand/phone detection entirely client-side against a hidden,
 *  non-recorded camera stream, sampled at a fixed interval, and reports
 *  discrete distraction events. No frame ever leaves the browser. Skips
 *  everything (no permission prompt, no model download) unless `enabled`. */
export function useCameraMonitoring({ enabled, sampleIntervalSec = 5, onEvent }: UseCameraMonitoringOptions) {
  const [status, setStatus] = useState<CameraStatus>('idle')
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const classifierStateRef = useRef<ClassifierState>(createClassifierState())
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const onEventRef = useRef(onEvent)
  useEffect(() => {
    onEventRef.current = onEvent
  })

  useEffect(() => {
    if (!enabled) {
      setStatus('idle')
      return
    }

    let cancelled = false
    let video: HTMLVideoElement | null = null

    async function start() {
      if (!navigator.mediaDevices?.getUserMedia) {
        setStatus('unavailable')
        return
      }

      setStatus('requesting')
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          // 320x240 was too low-res for coco-ssd to pick out a phone reliably
          // at typical webcam distance — 640x480 gives it meaningfully more
          // pixel detail before its internal 300x300 resize.
          video: { width: 640, height: 480 },
          audio: false,
        })
        if (cancelled) {
          stream.getTracks().forEach((t) => t.stop())
          return
        }
        streamRef.current = stream

        video = createHiddenVideoElement()
        video.srcObject = stream
        await video.play()
        await waitForFirstFrame(video)
        if (cancelled) return
        videoRef.current = video

        const [{ detectFace }, { detectPhone }, { detectHandNearBox }] = await Promise.all([
          import('./faceLandmarker'),
          import('./phoneDetector'),
          import('./handLandmarker'),
        ])
        if (cancelled) return

        classifierStateRef.current = createClassifierState()
        setStatus('active')

        intervalRef.current = setInterval(() => {
          void (async () => {
            const currentVideo = videoRef.current
            if (!currentVideo) return

            try {
              const timestampMs = performance.now()
              const face = await detectFace(currentVideo, timestampMs)
              const phone = await detectPhone(currentVideo)
              const hand = phone.phoneVisible
                ? await detectHandNearBox(currentVideo, timestampMs, phone.bbox)
                : null

              const sample: DetectionSample = { timestamp: new Date().toISOString(), face, hand, phone }
              const result = classifyDetectionSample(classifierStateRef.current, sample, sampleIntervalSec)
              classifierStateRef.current = result.state
              result.events.forEach((event) => onEventRef.current(event))
            } catch (err) {
              // A single failed sample (e.g. transient model hiccup) must not
              // silently kill monitoring forever — log and let the next tick
              // retry, but make the failure visible for debugging.
              console.error('[cv] detection sample failed', err)
            }
          })()
        }, sampleIntervalSec * 1000)
      } catch (err) {
        if (cancelled) return
        setStatus(err instanceof DOMException && err.name === 'NotAllowedError' ? 'denied' : 'error')
      }
    }

    void start()

    return () => {
      cancelled = true
      if (intervalRef.current) clearInterval(intervalRef.current)
      intervalRef.current = null

      flushClassifier(classifierStateRef.current, sampleIntervalSec).forEach((event) => onEventRef.current(event))

      streamRef.current?.getTracks().forEach((t) => t.stop())
      streamRef.current = null
      video?.remove()
      videoRef.current = null
      setStatus('idle')
    }
  }, [enabled, sampleIntervalSec])

  return { status }
}
