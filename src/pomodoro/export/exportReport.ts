import type { SessionRecord } from '../types/session'

const CSV_COLUMNS: { key: keyof SessionRecord; label: string }[] = [
  { key: 'startTime', label: 'Start Time' },
  { key: 'endTime', label: 'End Time' },
  { key: 'modeLabel', label: 'Mode' },
  { key: 'status', label: 'Status' },
  { key: 'actualWorkDurationSec', label: 'Work Duration (s)' },
  { key: 'actualBreakDurationSec', label: 'Break Duration (s)' },
  { key: 'focusScore', label: 'Focus Score' },
  { key: 'phoneUsageDurationSec', label: 'Phone Usage (s)' },
  { key: 'awayDurationSec', label: 'Away (s)' },
  { key: 'lookingAwayDurationSec', label: 'Looking Away (s)' },
  { key: 'screenAttentionDurationSec', label: 'Screen Attention (s)' },
  { key: 'accomplishment', label: 'Accomplishment' },
]

function csvEscape(value: unknown): string {
  const str = value === null || value === undefined ? '' : String(value)
  return /[",\n]/.test(str) ? `"${str.replace(/"/g, '""')}"` : str
}

export function sessionsToCSV(sessions: SessionRecord[]): string {
  const header = CSV_COLUMNS.map((c) => csvEscape(c.label)).join(',')
  const rows = sessions.map((s) => CSV_COLUMNS.map((c) => csvEscape(s[c.key])).join(','))
  return [header, ...rows].join('\n')
}

export function sessionsToJSON(sessions: SessionRecord[]): string {
  return JSON.stringify(sessions, null, 2)
}

export function downloadTextFile(filename: string, content: string, mimeType: string): void {
  const blob = new Blob([content], { type: mimeType })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}

export function exportSessionsAsCSV(sessions: SessionRecord[], filename = 'ai-pomodoro-sessions.csv'): void {
  downloadTextFile(filename, sessionsToCSV(sessions), 'text/csv;charset=utf-8;')
}

export function exportSessionsAsJSON(sessions: SessionRecord[], filename = 'ai-pomodoro-sessions.json'): void {
  downloadTextFile(filename, sessionsToJSON(sessions), 'application/json;charset=utf-8;')
}
