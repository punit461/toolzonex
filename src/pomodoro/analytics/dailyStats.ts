import type { SessionRecord } from '../types/session'
import { averageFocusScore, computeMostProductiveMode, totalWorkHours, type ModeAverage } from './aggregations'

export interface DailyStats {
  sessionsCompleted: number
  productiveHours: number
  averageFocusScore: number | null
  distractionCount: number
  mostProductiveMode: ModeAverage | null
  sessions: SessionRecord[]
}

export function computeDailyStats(sessions: SessionRecord[]): DailyStats {
  const completed = sessions.filter((s) => s.status === 'completed')
  return {
    sessionsCompleted: completed.length,
    productiveHours: totalWorkHours(sessions),
    averageFocusScore: averageFocusScore(completed),
    distractionCount: sessions.reduce((sum, s) => sum + s.distractionEvents.length, 0),
    mostProductiveMode: computeMostProductiveMode(completed),
    sessions,
  }
}
