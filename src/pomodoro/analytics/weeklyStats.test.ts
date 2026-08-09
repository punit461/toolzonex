import { describe, expect, it } from 'vitest'
import { computeWeeklyStats } from './weeklyStats'
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

const WEEK_START = new Date('2026-08-03T00:00:00.000Z')

describe('computeWeeklyStats', () => {
  it('produces exactly 7 daily breakdown points', () => {
    const stats = computeWeeklyStats([], WEEK_START)
    expect(stats.dailyBreakdown).toHaveLength(7)
    expect(stats.dailyBreakdown[0].date).toBe('2026-08-03')
    expect(stats.dailyBreakdown[6].date).toBe('2026-08-09')
  })

  it('buckets sessions into the correct day', () => {
    const stats = computeWeeklyStats(
      [session({ startTime: '2026-08-05T14:00:00.000Z', focusScore: 80 })],
      WEEK_START,
    )
    const day = stats.dailyBreakdown.find((d) => d.date === '2026-08-05')
    expect(day?.avgFocusScore).toBe(80)
    const otherDay = stats.dailyBreakdown.find((d) => d.date === '2026-08-03')
    expect(otherDay?.avgFocusScore).toBeNull()
  })

  it('sums total focus hours across the week', () => {
    const stats = computeWeeklyStats(
      [session({ actualWorkDurationSec: 3600 }), session({ actualWorkDurationSec: 1800 })],
      WEEK_START,
    )
    expect(stats.totalFocusHours).toBeCloseTo(1.5)
  })

  it('returns null phone usage trend with no prior-week data', () => {
    const stats = computeWeeklyStats([session()], WEEK_START, [])
    expect(stats.phoneUsageTrendPctChange).toBeNull()
  })

  it('computes phone usage percent change against the prior week', () => {
    const current = [session({ phoneUsageDurationSec: 118 })]
    const prior = [session({ phoneUsageDurationSec: 100 })]
    const stats = computeWeeklyStats(current, WEEK_START, prior)
    expect(stats.phoneUsageTrendPctChange).toBe(18)
  })
})
