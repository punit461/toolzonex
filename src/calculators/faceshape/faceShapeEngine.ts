// Face shape classification from MediaPipe FaceLandmarker's 478-point face
// mesh. Landmark indices below are the standard, stable MediaPipe face-mesh
// topology indices (the same mesh used elsewhere in this project's AI
// Pomodoro feature -- see src/pomodoro/cv/faceLandmarker.ts).
export const LANDMARK_INDICES = {
  foreheadTop: 10,
  chinBottom: 152,
  cheekLeft: 234,
  cheekRight: 454,
  jawLeft: 172,
  jawRight: 397,
  foreheadLeft: 21,
  foreheadRight: 251,
};

export type FaceShape = 'Oval' | 'Round' | 'Square' | 'Heart' | 'Diamond' | 'Oblong';

export interface FaceMeasurements {
  faceLength: number;
  faceWidth: number;
  jawWidth: number;
  foreheadWidth: number;
}

export interface Point { x: number; y: number }

function distance(a: Point, b: Point): number {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

export function measureFace(points: Record<keyof typeof LANDMARK_INDICES, Point>): FaceMeasurements {
  return {
    faceLength: distance(points.foreheadTop, points.chinBottom),
    faceWidth: distance(points.cheekLeft, points.cheekRight),
    jawWidth: distance(points.jawLeft, points.jawRight),
    foreheadWidth: distance(points.foreheadLeft, points.foreheadRight),
  };
}

/**
 * Heuristic face-shape classifier based on facial proportions. Like all
 * such heuristics (including commercial ones) this is an estimate for fun/
 * informational purposes, not a precise measurement.
 */
export function classifyFaceShape(m: FaceMeasurements): FaceShape {
  const lengthToWidth = m.faceLength / m.faceWidth;

  if (lengthToWidth > 1.55) {
    return 'Oblong';
  }
  if (m.foreheadWidth > m.faceWidth * 1.02 && m.foreheadWidth > m.jawWidth * 1.15) {
    return 'Heart';
  }
  if (m.faceWidth > m.foreheadWidth * 1.05 && m.faceWidth > m.jawWidth * 1.05) {
    return 'Diamond';
  }
  const jawToForehead = m.jawWidth / m.foreheadWidth;
  const cheekToJaw = m.faceWidth / m.jawWidth;
  if (lengthToWidth < 1.2 && jawToForehead > 0.85 && jawToForehead < 1.15 && cheekToJaw < 1.15) {
    return lengthToWidth < 1.05 ? 'Round' : 'Square';
  }
  return 'Oval';
}

export const FACE_SHAPE_DESCRIPTIONS: Record<FaceShape, string> = {
  Oval: 'Balanced proportions with a slightly narrower jaw than forehead, and a length noticeably greater than the width. Widely considered the most versatile shape for hairstyles and glasses.',
  Round: 'Similar face length and width, with soft, curved jawlines and full cheeks. Angular hairstyles and rectangular glasses frames tend to add definition.',
  Square: 'A strong, angular jawline with a forehead, cheekbones, and jaw of similar width. Rounded hairstyles and oval glasses frames tend to soften the angles.',
  Heart: 'A wider forehead tapering down to a narrower, sometimes pointed chin. Side-swept bangs and bottom-heavy glasses frames tend to balance the proportions.',
  Diamond: 'Widest at the cheekbones, with a narrower forehead and jawline. Styles that add width at the forehead or jaw tend to balance the cheekbone width.',
  Oblong: 'Noticeably longer than it is wide, with a fairly straight cheek line. Fuller-width hairstyles and glasses with more depth tend to shorten the visual length.',
};
