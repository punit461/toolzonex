import { useEffect, useState } from 'react'
import { CheckCircle2, Clock, Smartphone, Trophy, TrendingUp } from 'lucide-react'
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { getSessionsInRange } from './db/sessionsRepo'
import { computeDailyStats, type DailyStats } from './analytics/dailyStats'
import { StatTile } from './components/StatTile'
import { Card } from './components/Card'
import { ExportButtons } from './components/ExportButtons'

function todayRange() {
  const start = new Date()
  start.setHours(0, 0, 0, 0)
  const end = new Date(start)
  end.setDate(end.getDate() + 1)
  return { startIso: start.toISOString(), endIso: end.toISOString() }
}

export function DailyDashboard() {
  const [stats, setStats] = useState<DailyStats | null>(null)

  useEffect(() => {
    let cancelled = false
    const { startIso, endIso } = todayRange()
    getSessionsInRange(startIso, endIso).then((sessions) => {
      if (!cancelled) setStats(computeDailyStats(sessions))
    })
    return () => {
      cancelled = true
    }
  }, [])

  if (!stats) return <p className="text-text-muted">Loading…</p>

  if (stats.sessions.length === 0) {
    return (
      <Card className="text-center text-text-muted">
        No sessions yet today. Start one from the Timer tab.
      </Card>
    )
  }

  const chartData = stats.sessions
    .map((s, i) => ({ name: `#${i + 1}`, score: s.focusScore }))
    .filter((d): d is { name: string; score: number } => d.score !== null)

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <ExportButtons sessions={stats.sessions} filenamePrefix="ai-pomodoro-today" />
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <StatTile icon={CheckCircle2} label="Sessions" value={String(stats.sessionsCompleted)} />
        <StatTile icon={Clock} label="Productive hours" value={stats.productiveHours.toFixed(1)} />
        <StatTile
          icon={TrendingUp}
          label="Avg focus score"
          value={stats.averageFocusScore !== null ? String(stats.averageFocusScore) : '—'}
        />
        <StatTile icon={Smartphone} label="Distractions" value={String(stats.distractionCount)} />
      </div>

      {stats.mostProductiveMode && (
        <Card className="flex items-center gap-3">
          <Trophy className="h-5 w-5 shrink-0 text-accent" strokeWidth={2.25} />
          <p className="text-sm text-text">
            <span className="font-semibold">{stats.mostProductiveMode.modeLabel}</span> is your most productive mode
            today ({stats.mostProductiveMode.avgFocusScore}% avg focus)
          </p>
        </Card>
      )}

      {chartData.length > 0 && (
        <Card>
          <h2 className="mb-4 text-sm font-semibold text-text-muted uppercase">Focus score per session</h2>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="name" stroke="var(--color-text-muted)" fontSize={12} />
              <YAxis domain={[0, 100]} stroke="var(--color-text-muted)" fontSize={12} />
              <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid var(--color-border)' }} />
              <Bar dataKey="score" fill="var(--color-primary)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      )}
    </div>
  )
}
