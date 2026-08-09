import { describe, expect, it } from 'vitest'
import { sessionsToCSV, sessionsToJSON } from './exportReport'
import type { SessionRecord } from '../types/session'

function session(overrides: Partial<SessionRecord> = {}): SessionRecord {
  return {
    id: '1',
    mode: 'deep-work',
    modeLabel: 'Deep Work',
    startTime: '2026-08-03T09:00:00.000Z',
    endTime: '2026-08-03T09:50:00.000Z',
    plannedWorkDurationSec: 3000,
    plannedBreakDurationSec: 600,
    actualWorkDurationSec: 3000,
    actualBreakDurationSec: 600,
    status: 'completed',
    focusScore: 91,
    distractionEvents: [],
    phoneUsageDurationSec: 48,
    awayDurationSec: 82,
    lookingAwayDurationSec: 0,
    screenAttentionDurationSec: 2870,
    cvEnabled: true,
    accomplishment: 'Fixed the auth bug',
    ...overrides,
  }
}

describe('sessionsToCSV', () => {
  it('emits a header row plus one row per session', () => {
    const csv = sessionsToCSV([session(), session({ id: '2' })])
    const lines = csv.split('\n')
    expect(lines).toHaveLength(3)
    expect(lines[0]).toContain('Focus Score')
  })

  it('quotes and escapes fields containing commas, quotes, or newlines', () => {
    const csv = sessionsToCSV([session({ accomplishment: 'Fixed bug, wrote "tests", and more' })])
    const dataRow = csv.split('\n')[1]
    expect(dataRow).toContain('"Fixed bug, wrote ""tests"", and more"')
  })

  it('renders a null field as an empty cell', () => {
    const csv = sessionsToCSV([session({ accomplishment: null })])
    const cells = csv.split('\n')[1].split(',')
    expect(cells.at(-1)).toBe('')
  })
})

describe('sessionsToJSON', () => {
  it('round-trips session data losslessly', () => {
    const sessions = [session()]
    const parsed = JSON.parse(sessionsToJSON(sessions))
    expect(parsed).toEqual(sessions)
  })
})
