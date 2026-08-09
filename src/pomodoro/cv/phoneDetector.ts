import '@tensorflow/tfjs'
import * as cocoSsd from '@tensorflow-models/coco-ssd'
import type { PhoneDetectionResult } from './detectionTypes'

let modelPromise: Promise<cocoSsd.ObjectDetection> | null = null

function getPhoneModel(): Promise<cocoSsd.ObjectDetection> {
  // 'lite_mobilenet_v2' was too inaccurate in practice — it missed phones
  // outright often enough to make the feature useless. 'mobilenet_v2' is
  // slower but meaningfully more accurate; worth the extra inference cost
  // since we only sample every few seconds anyway, not every frame.
  if (!modelPromise) {
    modelPromise = cocoSsd.load({ base: 'mobilenet_v2' })
  }
  return modelPromise
}

export async function detectPhone(video: HTMLVideoElement): Promise<PhoneDetectionResult> {
  const model = await getPhoneModel()
  const predictions = await model.detect(video)
  const phone = predictions.find((p) => p.class === 'cell phone')

  if (!phone) {
    return { phoneVisible: false, confidence: 0, bbox: null }
  }

  const [x, y, width, height] = phone.bbox
  return { phoneVisible: true, confidence: phone.score, bbox: [x, y, width, height] }
}
