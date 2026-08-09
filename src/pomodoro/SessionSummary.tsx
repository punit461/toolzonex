import { useState, type FormEvent } from 'react'
import { CheckCircle2, Loader2, TrendingDown, TrendingUp } from 'lucide-react'
import { CircularProgress } from './components/CircularProgress'
import { Card } from './components/Card'
import { scoreTone, scoreToneClasses } from './components/scoreTone'
import type { ScoreBreakdownEntry } from './scoring/focusScore'
import type { SessionRecord } from './types/session'

interface SessionSummaryProps {
  status: 'completed' | 'abandoned'
  session: SessionRecord
  breakdown: ScoreBreakdownEntry[]
  saved: boolean
  onSubmitAccomplishment: (text: string) => Promise<void>
  onStartAnother: () => void
}

const STATUS_LABEL = { success: 'Excellent Focus', warning: 'Good Focus', danger: 'Needs Improvement' } as const

export function SessionSummary({
  status,
  session,
  breakdown,
  saved,
  onSubmitAccomplishment,
  onStartAnother,
}: SessionSummaryProps) {
  const [draft, setDraft] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const score = session.focusScore ?? 0
  const tone = scoreTone(score)
  const toneClasses = scoreToneClasses[tone]

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    await onSubmitAccomplishment(draft)
    setSubmitting(false)
  }

  return (
    <div className="mx-auto max-w-lg space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-text">
          Session {status === 'completed' ? 'complete' : 'ended early'}
        </h1>
        <p className="mt-1 text-sm text-text-muted">{session.modeLabel}</p>
      </div>

      <div className="flex flex-col items-center gap-3">
        <CircularProgress progress={score / 100} size={180} strokeWidth={12} colorClassName={toneClasses.stroke}>
          <span className={`text-4xl font-bold ${toneClasses.text}`}>{score}</span>
        </CircularProgress>
        <span className={`rounded-full px-3 py-1 text-sm font-semibold ${toneClasses.bg} ${toneClasses.text}`}>
          {STATUS_LABEL[tone]}
        </span>
      </div>

      {breakdown.length > 0 && (
        <Card>
          <h2 className="mb-3 text-sm font-semibold text-text-muted uppercase">Score breakdown</h2>
          <ul className="space-y-2">
            {breakdown.map((entry, i) => (
              <li key={i} className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 text-text">
                  {entry.delta > 0 ? (
                    <TrendingUp className="h-4 w-4 text-success" strokeWidth={2.25} />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-danger" strokeWidth={2.25} />
                  )}
                  {entry.label}
                </span>
                <span className={entry.delta > 0 ? 'font-semibold text-success' : 'font-semibold text-danger'}>
                  {entry.delta > 0 ? '+' : ''}
                  {entry.delta}
                </span>
              </li>
            ))}
          </ul>
        </Card>
      )}

      <Card>
        {!saved ? (
          <form onSubmit={handleSubmit} className="space-y-3">
            <label className="block text-sm font-semibold text-text" htmlFor="accomplishment">
              What did you accomplish?
            </label>
            <textarea
              id="accomplishment"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              rows={3}
              placeholder="e.g. Fixed the auth bug, solved 3 DSA problems…"
              className="w-full resize-none rounded-lg border border-border bg-bg px-3 py-2 text-sm text-text outline-none transition-colors duration-200 focus:border-primary"
            />
            <button
              type="submit"
              disabled={submitting}
              className="flex cursor-pointer items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-surface transition-colors duration-200 hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
              Save session
            </button>
          </form>
        ) : (
          <div className="flex items-center gap-2 text-success">
            <CheckCircle2 className="h-5 w-5" strokeWidth={2.25} />
            <span className="text-sm font-medium">Session saved.</span>
          </div>
        )}
      </Card>

      <button
        onClick={onStartAnother}
        disabled={!saved}
        className="w-full cursor-pointer rounded-lg border border-border bg-surface px-4 py-2.5 text-sm font-semibold text-text transition-colors duration-200 hover:bg-surface-muted disabled:cursor-not-allowed disabled:opacity-50"
      >
        Start another session
      </button>
    </div>
  )
}
