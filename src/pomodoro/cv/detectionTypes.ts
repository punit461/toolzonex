export interface FaceDetectionResult {
  faceDetected: boolean
  /** Approximate head-pose/gaze judgement: true if looking away from the screen. */
  lookingAway: boolean
}

export interface HandDetectionResult {
  handDetected: boolean
  /** True if a detected hand overlaps or is near the phone bounding box. */
  handNearPhone: boolean
}

export interface PhoneDetectionResult {
  phoneVisible: boolean
  confidence: number
  /** [x, y, width, height] in video pixel coordinates, when visible. */
  bbox?: [number, number, number, number] | null
}

export interface DetectionSample {
  timestamp: string
  face: FaceDetectionResult
  /** null when the hand model was skipped this sample (only run when a phone is visible, to save CPU). */
  hand: HandDetectionResult | null
  phone: PhoneDetectionResult
}
