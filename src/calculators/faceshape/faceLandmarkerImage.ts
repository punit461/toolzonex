import { FaceLandmarker, FilesetResolver } from '@mediapipe/tasks-vision';
import { LANDMARK_INDICES, measureFace, type Point } from './faceShapeEngine';

const WASM_BASE_URL = 'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm';
const MODEL_URL =
  'https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/latest/face_landmarker.task';

let landmarkerPromise: Promise<FaceLandmarker> | null = null;

function getFaceLandmarker(): Promise<FaceLandmarker> {
  if (!landmarkerPromise) {
    landmarkerPromise = FilesetResolver.forVisionTasks(WASM_BASE_URL).then((fileset) =>
      FaceLandmarker.createFromOptions(fileset, {
        baseOptions: { modelAssetPath: MODEL_URL, delegate: 'GPU' },
        outputFacialTransformationMatrixes: false,
        outputFaceBlendshapes: false,
        runningMode: 'IMAGE',
        numFaces: 1,
      }),
    );
  }
  return landmarkerPromise;
}

export async function detectFacePoints(image: HTMLImageElement): Promise<Record<keyof typeof LANDMARK_INDICES, Point> | null> {
  const landmarker = await getFaceLandmarker();
  const result = landmarker.detect(image);
  const landmarks = result.faceLandmarks[0];
  if (!landmarks) return null;

  const points = {} as Record<keyof typeof LANDMARK_INDICES, Point>;
  for (const key of Object.keys(LANDMARK_INDICES) as (keyof typeof LANDMARK_INDICES)[]) {
    const lm = landmarks[LANDMARK_INDICES[key]];
    points[key] = { x: lm.x * image.naturalWidth, y: lm.y * image.naturalHeight };
  }
  return points;
}

export { measureFace };
