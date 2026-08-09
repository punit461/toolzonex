export type ModeId =
  | 'deep-work'
  | 'learning'
  | 'coding-sprint'
  | 'interview-prep'
  | 'side-hustle'
  | 'custom'

export type DistractionEventType =
  | 'phone-usage'
  | 'away-from-screen'
  | 'looking-away'
  | 'manual-report'

export interface DistractionEvent {
  id: string
  type: DistractionEventType
  timestamp: string
  /** 0 for instantaneous events, >0 for sustained ones (e.g. looking-away > 10s). */
  durationSec: number
  /** 0-1; CV-sourced events carry model confidence, manual reports are always 1. */
  confidence: number
}

export type SessionStatus = 'completed' | 'abandoned' | 'in-progress'

export interface SessionRecord {
  id: string
  mode: ModeId
  modeLabel: string
  startTime: string
  endTime: string | null
  plannedWorkDurationSec: number
  plannedBreakDurationSec: number
  actualWorkDurationSec: number
  actualBreakDurationSec: number
  status: SessionStatus
  focusScore: number | null
  distractionEvents: DistractionEvent[]
  phoneUsageDurationSec: number
  awayDurationSec: number
  lookingAwayDurationSec: number
  screenAttentionDurationSec: number
  cvEnabled: boolean
  accomplishment: string | null
}
