import { describe, expect, it } from 'vitest'
import { computeDailyStats } from './dailyStats'
import type { SessionRecord } from '../types/session'

function session(overrides: Partial<SessionRecord> = {}): SessionRecord {
  return {
    id: crypto.randomUUID(),
    mode: 'deep-work',
    modeLabel: 'Deep Work',
    startTime: '2026-08-03T09:00:00.000Z',
    endTime: '2026-08-03T09:50:00.000Z',
    plannedWorkDurationSec: 3000,
    plannedBreakDurationSec: 600,
    actualWorkDurationSec: 3000,
    actualBreakDurationSec: 600,
    status: 'completed',
    focusScore: 90,
    distractionEvents: [],
    phoneUsageDurationSec: 0,
    awayDurationSec: 0,
    lookingAwayDurationSec: 0,
    screenAttentionDurationSec: 3000,
    cvEnabled: false,
    accomplishment: null,
    ...overrides,
  }
}

describe('computeDailyStats', () => {
  it('returns zeroed stats for no sessions', () => {
    const stats = computeDailyStats([])
    expect(stats.sessionsCompleted).toBe(0)
    expect(stats.productiveHours).toBe(0)
    expect(stats.averageFocusScore).toBeNull()
    expect(stats.mostProductiveMode).toBeNull()
  })

  it('counts only completed sessions toward sessionsCompleted', () => {
    const stats = computeDailyStats([session({ status: 'completed' }), session({ status: 'abandoned' })])
    expect(stats.sessionsCompleted).toBe(1)
  })

  it('sums actual work duration across all sessions (including abandoned) for productive hours', () => {
    const stats = computeDailyStats([
      session({ actualWorkDurationSec: 3600, status: 'completed' }),
      session({ actualWorkDurationSec: 1800, status: 'abandoned' }),
    ])
    expect(stats.productiveHours).toBeCloseTo(1.5)
  })

  it('averages focus score across completed sessions', () => {
    const stats = computeDailyStats([
      session({ focusScore: 80, status: 'completed' }),
      session({ focusScore: 100, status: 'completed' }),
    ])
    expect(stats.averageFocusScore).toBe(90)
  })

  it('counts total distraction events across sessions', () => {
    const evt = { id: '1', type: 'phone-usage' as const, timestamp: '', durationSec: 10, confidence: 1 }
    const stats = computeDailyStats([session({ distractionEvents: [evt, evt] }), session({ distractionEvents: [evt] })])
    expect(stats.distractionCount).toBe(3)
  })

  it('identifies the most productive mode by average focus score', () => {
    const stats = computeDailyStats([
      session({ mode: 'deep-work', modeLabel: 'Deep Work', focusScore: 70 }),
      session({ mode: 'learning', modeLabel: 'Learning', focusScore: 95 }),
    ])
    expect(stats.mostProductiveMode).toEqual({ mode: 'learning', modeLabel: 'Learning', avgFocusScore: 95 })
  })
})
