import { getDB } from './db'
import type { SessionRecord } from '../types/session'

export async function saveSession(session: SessionRecord): Promise<void> {
  const db = await getDB()
  await db.put('sessions', session)
}

export async function getSession(id: string): Promise<SessionRecord | undefined> {
  const db = await getDB()
  return db.get('sessions', id)
}

export async function getAllSessions(): Promise<SessionRecord[]> {
  const db = await getDB()
  return db.getAll('sessions')
}

export async function getSessionsInRange(startIso: string, endIso: string): Promise<SessionRecord[]> {
  const db = await getDB()
  const range = IDBKeyRange.bound(startIso, endIso)
  return db.getAllFromIndex('sessions', 'by-startTime', range)
}

export async function deleteSession(id: string): Promise<void> {
  const db = await getDB()
  await db.delete('sessions', id)
}
