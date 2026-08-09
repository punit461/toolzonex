import { openDB, type DBSchema, type IDBPDatabase } from 'idb'
import type { SessionRecord } from '../types/session'

interface AIPomodoroDB extends DBSchema {
  sessions: {
    key: string
    value: SessionRecord
    indexes: { 'by-startTime': string; 'by-mode': string }
  }
  weeklyInsightsCache: {
    key: string // weekStartDate, ISO date
    value: { weekStartDate: string; insights: string[]; generatedAt: string }
  }
}

let dbPromise: Promise<IDBPDatabase<AIPomodoroDB>> | null = null

export function getDB(): Promise<IDBPDatabase<AIPomodoroDB>> {
  if (!dbPromise) {
    dbPromise = openDB<AIPomodoroDB>('ai-pomodoro-db', 1, {
      upgrade(db) {
        const sessions = db.createObjectStore('sessions', { keyPath: 'id' })
        sessions.createIndex('by-startTime', 'startTime')
        sessions.createIndex('by-mode', 'mode')

        db.createObjectStore('weeklyInsightsCache', { keyPath: 'weekStartDate' })
      },
    })
  }
  return dbPromise
}
