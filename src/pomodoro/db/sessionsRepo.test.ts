import { beforeEach, describe, expect, it } from 'vitest'
import 'fake-indexeddb/auto'
import { deleteSession, getAllSessions, getSession, getSessionsInRange, saveSession } from './sessionsRepo'
import type { SessionRecord } from '../types/session'

function makeSession(overrides: Partial<SessionRecord> = {}): SessionRecord {
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

describe('sessionsRepo', () => {
  beforeEach(async () => {
    for (const session of await getAllSessions()) {
      await deleteSession(session.id)
    }
  })

  it('round-trips a session through save/get', async () => {
    const session = makeSession()
    await saveSession(session)
    const fetched = await getSession(session.id)
    expect(fetched).toEqual(session)
  })

  it('lists all saved sessions', async () => {
    await saveSession(makeSession())
    await saveSession(makeSession())
    expect(await getAllSessions()).toHaveLength(2)
  })

  it('queries sessions within a startTime range', async () => {
    const inRange = makeSession({ startTime: '2026-08-03T09:00:00.000Z' })
    const outOfRange = makeSession({ startTime: '2026-08-10T09:00:00.000Z' })
    await saveSession(inRange)
    await saveSession(outOfRange)

    const result = await getSessionsInRange('2026-08-01T00:00:00.000Z', '2026-08-07T23:59:59.999Z')
    expect(result.map((s) => s.id)).toEqual([inRange.id])
  })

  it('deletes a session', async () => {
    const session = makeSession()
    await saveSession(session)
    await deleteSession(session.id)
    expect(await getSession(session.id)).toBeUndefined()
  })
})
