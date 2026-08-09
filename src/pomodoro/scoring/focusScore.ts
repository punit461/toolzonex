import type { DistractionEvent } from '../types/session'

export interface ScoringInput {
  distractionEvents: DistractionEvent[]
  sessionCompleted: boolean
}

export interface ScoreBreakdownEntry {
  label: string
  delta: number
}

export interface ScoringResult {
  score: number
  breakdown: ScoreBreakdownEntry[]
}

const LOOKING_AWAY_THRESHOLD_SEC = 10

export function computeFocusScore(input: ScoringInput): ScoringResult {
  let score = 100
  const breakdown: ScoreBreakdownEntry[] = []

  for (const event of input.distractionEvents) {
    if (event.type === 'phone-usage') {
      score -= 20
      breakdown.push({ label: 'Phone Usage', delta: -20 })
    } else if (event.type === 'away-from-screen') {
      score -= 10
      breakdown.push({ label: 'Away From Screen', delta: -10 })
    } else if (event.type === 'looking-away' && event.durationSec > LOOKING_AWAY_THRESHOLD_SEC) {
      score -= 5
      breakdown.push({ label: 'Looking Away > 10s', delta: -5 })
    } else if (event.type === 'manual-report') {
      // Not a BRD-defined category — the self-report button used before CV
      // (M5) exists. Scored like a generic mid-severity distraction.
      score -= 10
      breakdown.push({ label: 'Manual Distraction Report', delta: -10 })
    }
  }

  if (input.sessionCompleted) {
    score += 5
    breakdown.push({ label: 'Session Completion', delta: 5 })
  }

  if (input.sessionCompleted && input.distractionEvents.length === 0) {
    score += 10
    breakdown.push({ label: 'Full Focus Session', delta: 10 })
  }

  return { score: Math.max(0, Math.min(100, score)), breakdown }
}
