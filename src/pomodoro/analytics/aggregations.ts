import type { SessionRecord } from '../types/session'

export interface ModeAverage {
  mode: string
  modeLabel: string
  avgFocusScore: number
}

/** Picks the mode with the highest average focus score among completed
 *  sessions; ties broken by whichever has more sessions. */
export function computeMostProductiveMode(sessions: SessionRecord[]): ModeAverage | null {
  const byMode = new Map<string, { modeLabel: string; scores: number[] }>()
  for (const session of sessions) {
    if (session.focusScore === null) continue
    const entry = byMode.get(session.mode) ?? { modeLabel: session.modeLabel, scores: [] }
    entry.scores.push(session.focusScore)
    byMode.set(session.mode, entry)
  }

  let best: (ModeAverage & { count: number }) | null = null
  for (const [mode, { modeLabel, scores }] of byMode) {
    const avgFocusScore = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
    const count = scores.length
    if (!best || avgFocusScore > best.avgFocusScore || (avgFocusScore === best.avgFocusScore && count > best.count)) {
      best = { mode, modeLabel, avgFocusScore, count }
    }
  }
  return best ? { mode: best.mode, modeLabel: best.modeLabel, avgFocusScore: best.avgFocusScore } : null
}

export function averageFocusScore(sessions: SessionRecord[]): number | null {
  const scores = sessions.map((s) => s.focusScore).filter((s): s is number => s !== null)
  if (!scores.length) return null
  return Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
}

export function totalWorkHours(sessions: SessionRecord[]): number {
  return sessions.reduce((sum, s) => sum + s.actualWorkDurationSec, 0) / 3600
}
