import { describe, expect, it } from 'vitest'
import {
  classifyDetectionSample,
  createClassifierState,
  flushClassifier,
  type ClassifierState,
} from './distractionClassifier'
import type { DetectionSample } from './detectionTypes'

const SAMPLE_INTERVAL = 5

function sample(overrides: Partial<DetectionSample> = {}): DetectionSample {
  return {
    timestamp: new Date().toISOString(),
    face: { faceDetected: true, lookingAway: false },
    hand: null,
    phone: { phoneVisible: false, confidence: 0 },
    ...overrides,
  }
}

function run(samples: DetectionSample[]) {
  let state: ClassifierState = createClassifierState()
  const allEvents = []
  for (const s of samples) {
    const result = classifyDetectionSample(state, s, SAMPLE_INTERVAL)
    state = result.state
    allEvents.push(...result.events)
  }
  return { state, events: allEvents }
}

describe('classifyDetectionSample — away from screen', () => {
  it('does not flag a single missed-face sample', () => {
    const { events } = run([sample({ face: { faceDetected: false, lookingAway: false } })])
    expect(events).toHaveLength(0)
  })

  it('flags away-from-screen after two consecutive missed-face samples', () => {
    const { events } = run([
      sample({ face: { faceDetected: false, lookingAway: false } }),
      sample({ face: { faceDetected: false, lookingAway: false } }),
    ])
    expect(events).toHaveLength(1)
    expect(events[0]).toMatchObject({ type: 'away-from-screen', durationSec: 10 })
  })

  it('does not re-emit away-from-screen every sample during a long absence', () => {
    const { events } = run(
      Array.from({ length: 6 }, () => sample({ face: { faceDetected: false, lookingAway: false } })),
    )
    expect(events).toHaveLength(1)
  })

  it('resets the streak once the face returns', () => {
    const { events } = run([
      sample({ face: { faceDetected: false, lookingAway: false } }),
      sample({ face: { faceDetected: true, lookingAway: false } }),
      sample({ face: { faceDetected: false, lookingAway: false } }),
    ])
    expect(events).toHaveLength(0)
  })
})

describe('classifyDetectionSample — looking away', () => {
  it('does not flag looking-away at exactly the 10s threshold', () => {
    const { events } = run([
      sample({ face: { faceDetected: true, lookingAway: true } }),
      sample({ face: { faceDetected: true, lookingAway: true } }),
    ])
    // 2 samples * 5s = 10s, threshold requires STRICTLY greater than 10s
    expect(events).toHaveLength(0)
  })

  it('flags looking-away once it exceeds 10s', () => {
    const { events } = run([
      sample({ face: { faceDetected: true, lookingAway: true } }),
      sample({ face: { faceDetected: true, lookingAway: true } }),
      sample({ face: { faceDetected: true, lookingAway: true } }),
    ])
    expect(events).toHaveLength(1)
    expect(events[0]).toMatchObject({ type: 'looking-away', durationSec: 15 })
  })

  it('only emits once per continuous looking-away streak', () => {
    const { events } = run(
      Array.from({ length: 6 }, () => sample({ face: { faceDetected: true, lookingAway: true } })),
    )
    expect(events).toHaveLength(1)
  })

  it('resets when the user looks back at the screen', () => {
    const { events } = run([
      sample({ face: { faceDetected: true, lookingAway: true } }),
      sample({ face: { faceDetected: true, lookingAway: true } }),
      sample({ face: { faceDetected: true, lookingAway: true } }), // fires here
      sample({ face: { faceDetected: true, lookingAway: false } }),
      sample({ face: { faceDetected: true, lookingAway: true } }),
      sample({ face: { faceDetected: true, lookingAway: true } }),
    ])
    expect(events).toHaveLength(1) // second streak hasn't exceeded 10s yet
  })
})

describe('classifyDetectionSample — phone usage', () => {
  it('does not flag a phone visible but unused on the desk', () => {
    const { events } = run([
      sample({ phone: { phoneVisible: true, confidence: 0.9 }, face: { faceDetected: true, lookingAway: false } }),
      sample({ phone: { phoneVisible: false, confidence: 0 } }),
    ])
    expect(events).toHaveLength(0)
  })

  it('does not flag a low-confidence phone detection even with a hand nearby', () => {
    const { events } = run([
      sample({
        phone: { phoneVisible: true, confidence: 0.3 },
        hand: { handDetected: true, handNearPhone: true },
      }),
      sample({ phone: { phoneVisible: false, confidence: 0 } }),
    ])
    expect(events).toHaveLength(0)
  })

  it('flags phone-usage when a confident phone detection overlaps a hand', () => {
    const { events } = run([
      sample({
        phone: { phoneVisible: true, confidence: 0.9 },
        hand: { handDetected: true, handNearPhone: true },
      }),
      sample({
        phone: { phoneVisible: true, confidence: 0.9 },
        hand: { handDetected: true, handNearPhone: true },
      }),
      sample({ phone: { phoneVisible: false, confidence: 0 } }), // episode ends here
    ])
    expect(events).toHaveLength(1)
    expect(events[0]).toMatchObject({ type: 'phone-usage', durationSec: 10 })
  })

  it('flags phone-usage when gaze is away even without hand data', () => {
    const { events } = run([
      sample({ phone: { phoneVisible: true, confidence: 0.8 }, face: { faceDetected: true, lookingAway: true } }),
      sample({ phone: { phoneVisible: false, confidence: 0 } }),
    ])
    expect(events).toHaveLength(1)
    expect(events[0].type).toBe('phone-usage')
  })

  it('reports one event per usage episode, not per sample', () => {
    const { events } = run([
      sample({ phone: { phoneVisible: true, confidence: 0.9 }, hand: { handDetected: true, handNearPhone: true } }),
      sample({ phone: { phoneVisible: true, confidence: 0.9 }, hand: { handDetected: true, handNearPhone: true } }),
      sample({ phone: { phoneVisible: false, confidence: 0 } }),
      sample({ phone: { phoneVisible: true, confidence: 0.9 }, hand: { handDetected: true, handNearPhone: true } }),
      sample({ phone: { phoneVisible: false, confidence: 0 } }),
    ])
    expect(events.filter((e) => e.type === 'phone-usage')).toHaveLength(2)
  })
})

describe('flushClassifier', () => {
  it('closes out an in-progress phone episode at session end', () => {
    const { state } = run([
      sample({ phone: { phoneVisible: true, confidence: 0.9 }, hand: { handDetected: true, handNearPhone: true } }),
      sample({ phone: { phoneVisible: true, confidence: 0.9 }, hand: { handDetected: true, handNearPhone: true } }),
    ])
    const flushed = flushClassifier(state, SAMPLE_INTERVAL)
    expect(flushed).toHaveLength(1)
    expect(flushed[0]).toMatchObject({ type: 'phone-usage', durationSec: 10 })
  })

  it('emits nothing when there is no open episode', () => {
    const flushed = flushClassifier(createClassifierState(), SAMPLE_INTERVAL)
    expect(flushed).toHaveLength(0)
  })
})
