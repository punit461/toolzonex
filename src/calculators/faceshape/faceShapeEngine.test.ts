import { describe, expect, it } from 'vitest';
import { classifyFaceShape, measureFace, type FaceMeasurements } from './faceShapeEngine';

describe('classifyFaceShape', () => {
  it('classifies a long, narrow face as Oblong', () => {
    const m: FaceMeasurements = { faceLength: 180, faceWidth: 100, jawWidth: 95, foreheadWidth: 95 };
    expect(classifyFaceShape(m)).toBe('Oblong');
  });

  it('classifies a wide forehead tapering to a narrow jaw as Heart', () => {
    const m: FaceMeasurements = { faceLength: 130, faceWidth: 100, jawWidth: 70, foreheadWidth: 105 };
    expect(classifyFaceShape(m)).toBe('Heart');
  });

  it('classifies widest-at-cheekbones as Diamond', () => {
    const m: FaceMeasurements = { faceLength: 130, faceWidth: 105, jawWidth: 80, foreheadWidth: 85 };
    expect(classifyFaceShape(m)).toBe('Diamond');
  });

  it('classifies similar length/width with soft jaw as Round', () => {
    const m: FaceMeasurements = { faceLength: 100, faceWidth: 98, jawWidth: 95, foreheadWidth: 95 };
    expect(classifyFaceShape(m)).toBe('Round');
  });

  it('classifies similar length/width with a squarer jaw as Square', () => {
    const m: FaceMeasurements = { faceLength: 110, faceWidth: 100, jawWidth: 98, foreheadWidth: 98 };
    expect(classifyFaceShape(m)).toBe('Square');
  });

  it('falls back to Oval for balanced but elongated proportions', () => {
    const m: FaceMeasurements = { faceLength: 135, faceWidth: 100, jawWidth: 90, foreheadWidth: 98 };
    expect(classifyFaceShape(m)).toBe('Oval');
  });
});

describe('measureFace', () => {
  it('computes euclidean distances between landmark pairs', () => {
    const points = {
      foreheadTop: { x: 0, y: 0 },
      chinBottom: { x: 0, y: 100 },
      cheekLeft: { x: -50, y: 50 },
      cheekRight: { x: 50, y: 50 },
      jawLeft: { x: -40, y: 90 },
      jawRight: { x: 40, y: 90 },
      foreheadLeft: { x: -45, y: 10 },
      foreheadRight: { x: 45, y: 10 },
    };
    const m = measureFace(points);
    expect(m.faceLength).toBeCloseTo(100, 5);
    expect(m.faceWidth).toBeCloseTo(100, 5);
    expect(m.jawWidth).toBeCloseTo(80, 5);
    expect(m.foreheadWidth).toBeCloseTo(90, 5);
  });
});
