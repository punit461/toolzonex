import type { ModeId } from '../types/session'

export interface Mode {
  id: ModeId
  label: string
  workSec: number
  breakSec: number
  trackingFields: string[]
}

// Durations for Deep Work, Learning, and Coding Sprint come directly from the
// BRD (section 6). Interview Prep and Side Hustle have no durations specified
// there (only tracked fields) — 45/10 is a reasonable placeholder until product
// input narrows it down; users can always fall back to Custom mode.
export const BUILT_IN_MODES: Mode[] = [
  {
    id: 'deep-work',
    label: 'Deep Work',
    workSec: 50 * 60,
    breakSec: 10 * 60,
    trackingFields: ['Sessions completed', 'Focus score'],
  },
  {
    id: 'learning',
    label: 'Learning',
    workSec: 30 * 60,
    breakSec: 5 * 60,
    trackingFields: ['Learning notes', 'Topics completed'],
  },
  {
    id: 'coding-sprint',
    label: 'Coding Sprint',
    workSec: 90 * 60,
    breakSec: 15 * 60,
    trackingFields: ['Features completed', 'Bugs fixed'],
  },
  {
    id: 'interview-prep',
    label: 'Interview Prep',
    workSec: 45 * 60,
    breakSec: 10 * 60,
    trackingFields: ['DSA sessions', 'System design sessions', 'Applications submitted'],
  },
  {
    id: 'side-hustle',
    label: 'Side Hustle',
    workSec: 45 * 60,
    breakSec: 10 * 60,
    trackingFields: ['Tasks shipped', 'Revenue impact', 'Content published'],
  },
]

export function createCustomMode(label: string, workMinutes: number, breakMinutes: number): Mode {
  return {
    id: 'custom',
    label,
    workSec: Math.max(1, Math.round(workMinutes * 60)),
    breakSec: Math.max(0, Math.round(breakMinutes * 60)),
    trackingFields: ['Custom configurations', 'Session statistics'],
  }
}
