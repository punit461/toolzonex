import { FaceLandmarker, FilesetResolver } from '@mediapipe/tasks-vision'
import type { FaceDetectionResult } from './detectionTypes'

const WASM_BASE_URL = 'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm'
const MODEL_URL =
  'https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/latest/face_landmarker.task'

// Head pose beyond these angles (degrees) is treated as "not looking at the
// screen". Empirically-tunable — start conservative to avoid false positives
// from normal head movement while typing/reading.
const YAW_THRESHOLD_DEG = 25
const PITCH_THRESHOLD_DEG = 20

let landmarkerPromise: Promise<FaceLandmarker> | null = null

function getFaceLandmarker(): Promise<FaceLandmarker> {
  if (!landmarkerPromise) {
    landmarkerPromise = FilesetResolver.forVisionTasks(WASM_BASE_URL).then((fileset) =>
      FaceLandmarker.createFromOptions(fileset, {
        baseOptions: { modelAssetPath: MODEL_URL, delegate: 'GPU' },
        outputFacialTransformationMatrixes: true,
        outputFaceBlendshapes: false,
        runningMode: 'VIDEO',
        numFaces: 1,
      }),
    )
  }
  return landmarkerPromise
}

/** Extracts yaw/pitch (degrees) from a column-major 4x4 rotation matrix, as
 *  returned by MediaPipe's facialTransformationMatrixes. */
function matrixToYawPitch(m: Float32Array): { yaw: number; pitch: number } {
  // m is column-major: m[col*4 + row]
  const r00 = m[0],
    r10 = m[1],
    r20 = m[2]
  const yaw = Math.atan2(-r20, Math.sqrt(r00 * r00 + r10 * r10)) * (180 / Math.PI)
  const pitch = Math.atan2(r10, r00) * (180 / Math.PI)
  return { yaw, pitch }
}

export async function detectFace(video: HTMLVideoElement, timestampMs: number): Promise<FaceDetectionResult> {
  const landmarker = await getFaceLandmarker()
  const result = landmarker.detectForVideo(video, timestampMs)

  if (!result.faceLandmarks.length) {
    return { faceDetected: false, lookingAway: false }
  }

  const matrix = result.facialTransformationMatrixes?.[0]?.data
  if (!matrix) {
    return { faceDetected: true, lookingAway: false }
  }

  const { yaw, pitch } = matrixToYawPitch(matrix as unknown as Float32Array)
  const lookingAway = Math.abs(yaw) > YAW_THRESHOLD_DEG || Math.abs(pitch) > PITCH_THRESHOLD_DEG
  return { faceDetected: true, lookingAway }
}
