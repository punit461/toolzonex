import { FileJson, FileText } from 'lucide-react'
import { exportSessionsAsCSV, exportSessionsAsJSON } from '../export/exportReport'
import type { SessionRecord } from '../types/session'

interface ExportButtonsProps {
  sessions: SessionRecord[]
  filenamePrefix: string
}

export function ExportButtons({ sessions, filenamePrefix }: ExportButtonsProps) {
  if (sessions.length === 0) return null

  return (
    <div className="flex gap-2">
      <button
        type="button"
        onClick={() => exportSessionsAsCSV(sessions, `${filenamePrefix}.csv`)}
        className="flex cursor-pointer items-center gap-1.5 rounded-lg border border-border bg-surface px-3 py-1.5 text-sm font-medium text-text-muted transition-colors duration-200 hover:bg-surface-muted hover:text-text"
      >
        <FileText className="h-4 w-4" strokeWidth={2.25} /> CSV
      </button>
      <button
        type="button"
        onClick={() => exportSessionsAsJSON(sessions, `${filenamePrefix}.json`)}
        className="flex cursor-pointer items-center gap-1.5 rounded-lg border border-border bg-surface px-3 py-1.5 text-sm font-medium text-text-muted transition-colors duration-200 hover:bg-surface-muted hover:text-text"
      >
        <FileJson className="h-4 w-4" strokeWidth={2.25} /> JSON
      </button>
    </div>
  )
}
