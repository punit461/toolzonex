import type { SessionRecord } from '../types/session'
import { computeMostProductiveMode, totalWorkHours, type ModeAverage } from './aggregations'

export interface DayTrendPoint {
  date: string // ISO date, yyyy-mm-dd
  avgFocusScore: number | null
  distractionCount: number
}

export interface WeeklyStats {
  totalFocusHours: number
  topMode: ModeAverage | null
  /** 7 points, oldest to newest, one per calendar day of the week window. */
  dailyBreakdown: DayTrendPoint[]
  /** % change in phone-usage duration vs the prior 7-day window; null with no baseline. */
  phoneUsageTrendPctChange: number | null
  sessions: SessionRecord[]
}

export function computeWeeklyStats(
  sessions: SessionRecord[],
  weekStart: Date,
  priorWeekSessions: SessionRecord[] = [],
): WeeklyStats {
  const completed = sessions.filter((s) => s.status === 'completed')

  const dailyBreakdown: DayTrendPoint[] = []
  for (let i = 0; i < 7; i++) {
    const day = new Date(weekStart)
    day.setDate(day.getDate() + i)
    const dateStr = day.toISOString().slice(0, 10)
    const daySessions = sessions.filter((s) => s.startTime.slice(0, 10) === dateStr)
    const scores = daySessions.map((s) => s.focusScore).filter((s): s is number => s !== null)
    dailyBreakdown.push({
      date: dateStr,
      avgFocusScore: scores.length ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : null,
      distractionCount: daySessions.reduce((sum, s) => sum + s.distractionEvents.length, 0),
    })
  }

  return {
    totalFocusHours: totalWorkHours(sessions),
    topMode: computeMostProductiveMode(completed),
    dailyBreakdown,
    phoneUsageTrendPctChange: computePhoneUsageTrendPctChange(sessions, priorWeekSessions),
    sessions,
  }
}

function computePhoneUsageTrendPctChange(current: SessionRecord[], prior: SessionRecord[]): number | null {
  const priorTotal = prior.reduce((sum, s) => sum + s.phoneUsageDurationSec, 0)
  if (priorTotal === 0) return null
  const currentTotal = current.reduce((sum, s) => sum + s.phoneUsageDurationSec, 0)
  return Math.round(((currentTotal - priorTotal) / priorTotal) * 100)
}
