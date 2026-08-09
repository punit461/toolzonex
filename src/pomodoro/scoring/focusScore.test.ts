import { describe, expect, it } from 'vitest'
import { computeFocusScore } from './focusScore'
import type { DistractionEvent } from '../types/session'

function event(overrides: Partial<DistractionEvent> = {}): DistractionEvent {
  return {
    id: crypto.randomUUID(),
    type: 'phone-usage',
    timestamp: new Date().toISOString(),
    durationSec: 0,
    confidence: 1,
    ...overrides,
  }
}

describe('computeFocusScore', () => {
  it('gives a completed session with zero distractions the full-focus bonus, clamped to 100', () => {
    const result = computeFocusScore({ distractionEvents: [], sessionCompleted: true })
    // 100 + 5 (completion) + 10 (full focus) = 115, clamped to 100
    expect(result.score).toBe(100)
    expect(result.breakdown).toEqual([
      { label: 'Session Completion', delta: 5 },
      { label: 'Full Focus Session', delta: 10 },
    ])
  })

  it('applies -20 per phone-usage event', () => {
    const result = computeFocusScore({
      distractionEvents: [event({ type: 'phone-usage' })],
      sessionCompleted: false,
    })
    expect(result.score).toBe(80)
  })

  it('applies -10 per away-from-screen event', () => {
    const result = computeFocusScore({
      distractionEvents: [event({ type: 'away-from-screen' })],
      sessionCompleted: false,
    })
    expect(result.score).toBe(90)
  })

  it('applies -5 for looking-away only when duration exceeds 10s', () => {
    const short = computeFocusScore({
      distractionEvents: [event({ type: 'looking-away', durationSec: 10 })],
      sessionCompleted: false,
    })
    expect(short.score).toBe(100)

    const long = computeFocusScore({
      distractionEvents: [event({ type: 'looking-away', durationSec: 11 })],
      sessionCompleted: false,
    })
    expect(long.score).toBe(95)
  })

  it('stacks multiple distraction events', () => {
    const result = computeFocusScore({
      distractionEvents: [
        event({ type: 'phone-usage' }),
        event({ type: 'phone-usage' }),
        event({ type: 'away-from-screen' }),
      ],
      sessionCompleted: false,
    })
    // 100 - 20 - 20 - 10 = 50
    expect(result.score).toBe(50)
  })

  it('does not award completion or full-focus bonuses when the session was not completed', () => {
    const result = computeFocusScore({ distractionEvents: [], sessionCompleted: false })
    expect(result.score).toBe(100)
    expect(result.breakdown).toEqual([])
  })

  it('awards completion bonus but not full-focus bonus when distractions occurred', () => {
    const result = computeFocusScore({
      distractionEvents: [event({ type: 'away-from-screen' })],
      sessionCompleted: true,
    })
    // 100 - 10 + 5 = 95
    expect(result.score).toBe(95)
    expect(result.breakdown.map((b) => b.label)).not.toContain('Full Focus Session')
  })

  it('clamps the score at 0 with many distractions', () => {
    const result = computeFocusScore({
      distractionEvents: Array.from({ length: 10 }, () => event({ type: 'phone-usage' })),
      sessionCompleted: false,
    })
    expect(result.score).toBe(0)
  })

  it('matches the BRD worked example: 48s phone usage + away, completed session -> Excellent Focus range', () => {
    const result = computeFocusScore({
      distractionEvents: [
        event({ type: 'phone-usage', durationSec: 48 }),
        event({ type: 'away-from-screen', durationSec: 82 }),
      ],
      sessionCompleted: true,
    })
    // 100 - 20 - 10 + 5 = 75
    expect(result.score).toBe(75)
  })
})
