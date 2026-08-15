import { FilesetResolver, HandLandmarker } from '@mediapipe/tasks-vision'
import type { HandDetectionResult } from './detectionTypes'

// Pinned to the exact version in package.json — see faceLandmarker.ts for why
// `@latest` here is a live-breakage risk, not just a style nit.
const WASM_BASE_URL = 'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@1.0.1/wasm'
const MODEL_URL =
  'https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/latest/hand_landmarker.task'

// Fraction of the phone's bounding box size used as a proximity margin —
// a hand landmark within this margin around the box counts as "near".
const PROXIMITY_MARGIN_RATIO = 0.15

let landmarkerPromise: Promise<HandLandmarker> | null = null

function getHandLandmarker(): Promise<HandLandmarker> {
  if (!landmarkerPromise) {
    landmarkerPromise = FilesetResolver.forVisionTasks(WASM_BASE_URL).then((fileset) =>
      HandLandmarker.createFromOptions(fileset, {
        baseOptions: { modelAssetPath: MODEL_URL, delegate: 'GPU' },
        runningMode: 'VIDEO',
        numHands: 2,
      }),
    )
  }
  return landmarkerPromise
}

/** Only worth calling when a phone bounding box exists — the hand model is
 *  the most expensive of the three, so it's skipped entirely (by the caller)
 *  when there's no phone in frame to check proximity against. */
export async function detectHandNearBox(
  video: HTMLVideoElement,
  timestampMs: number,
  box: [number, number, number, number] | null | undefined,
): Promise<HandDetectionResult> {
  if (!box) return { handDetected: false, handNearPhone: false }

  const landmarker = await getHandLandmarker()
  const result = landmarker.detectForVideo(video, timestampMs)

  if (!result.landmarks.length) {
    return { handDetected: false, handNearPhone: false }
  }

  const [bx, by, bw, bh] = box
  const marginX = bw * PROXIMITY_MARGIN_RATIO
  const marginY = bh * PROXIMITY_MARGIN_RATIO
  const videoWidth = video.videoWidth
  const videoHeight = video.videoHeight

  const near = result.landmarks.some((points) =>
    points.some((pt) => {
      const x = pt.x * videoWidth
      const y = pt.y * videoHeight
      return x >= bx - marginX && x <= bx + bw + marginX && y >= by - marginY && y <= by + bh + marginY
    }),
  )

  return { handDetected: true, handNearPhone: near }
}
