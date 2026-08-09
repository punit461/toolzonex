import { useEffect, useState } from 'react'
import { Clock, Smartphone, Trophy } from 'lucide-react'
import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { getSessionsInRange } from './db/sessionsRepo'
import { computeWeeklyStats, type WeeklyStats } from './analytics/weeklyStats'
import { StatTile } from './components/StatTile'
import { Card } from './components/Card'
import { ExportButtons } from './components/ExportButtons'

function weekRange(offsetWeeks: number) {
  const start = new Date()
  start.setHours(0, 0, 0, 0)
  start.setDate(start.getDate() - start.getDay() + offsetWeeks * 7)
  const end = new Date(start)
  end.setDate(end.getDate() + 7)
  return { start, startIso: start.toISOString(), endIso: end.toISOString() }
}

export function WeeklyDashboard() {
  const [stats, setStats] = useState<WeeklyStats | null>(null)

  useEffect(() => {
    let cancelled = false
    const thisWeek = weekRange(0)
    const priorWeek = weekRange(-1)
    Promise.all([
      getSessionsInRange(thisWeek.startIso, thisWeek.endIso),
      getSessionsInRange(priorWeek.startIso, priorWeek.endIso),
    ]).then(([current, prior]) => {
      if (cancelled) return
      setStats(computeWeeklyStats(current, thisWeek.start, prior))
    })
    return () => {
      cancelled = true
    }
  }, [])

  if (!stats) return <p className="text-text-muted">Loading…</p>

  const chartData = stats.dailyBreakdown.map((d) => ({
    day: new Date(`${d.date}T00:00:00`).toLocaleDateString(undefined, { weekday: 'short' }),
    score: d.avgFocusScore,
    distractions: d.distractionCount,
  }))

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <ExportButtons sessions={stats.sessions} filenamePrefix="ai-pomodoro-week" />
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        <StatTile icon={Clock} label="Total focus hours" value={stats.totalFocusHours.toFixed(1)} />
        <StatTile
          icon={Trophy}
          label="Top mode"
          value={stats.topMode?.modeLabel ?? '—'}
          sublabel={stats.topMode ? `${stats.topMode.avgFocusScore}% avg` : undefined}
        />
        <StatTile
          icon={Smartphone}
          label="Phone usage trend"
          value={
            stats.phoneUsageTrendPctChange !== null
              ? `${stats.phoneUsageTrendPctChange > 0 ? '+' : ''}${stats.phoneUsageTrendPctChange}%`
              : '—'
          }
          sublabel="vs last week"
        />
      </div>

      <Card>
        <h2 className="mb-4 text-sm font-semibold text-text-muted uppercase">Focus score trend</h2>
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis dataKey="day" stroke="var(--color-text-muted)" fontSize={12} />
            <YAxis domain={[0, 100]} stroke="var(--color-text-muted)" fontSize={12} />
            <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid var(--color-border)' }} />
            <Line type="monotone" dataKey="score" stroke="var(--color-primary)" strokeWidth={2} dot={{ r: 3 }} connectNulls />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      <Card>
        <h2 className="mb-4 text-sm font-semibold text-text-muted uppercase">Distraction trend</h2>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis dataKey="day" stroke="var(--color-text-muted)" fontSize={12} />
            <YAxis allowDecimals={false} stroke="var(--color-text-muted)" fontSize={12} />
            <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid var(--color-border)' }} />
            <Bar dataKey="distractions" fill="var(--color-accent)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </div>
  )
}
