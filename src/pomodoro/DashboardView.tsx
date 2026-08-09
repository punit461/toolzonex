'use client'

import { useState } from 'react'
import { DailyDashboard } from './DailyDashboard'
import { WeeklyDashboard } from './WeeklyDashboard'

const TABS = [
  { key: 'today', label: 'Today' },
  { key: 'week', label: 'This week' },
] as const

export function DashboardView() {
  const [tab, setTab] = useState<(typeof TABS)[number]['key']>('today')

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text">Dashboard</h1>
        <div className="mt-4 inline-flex rounded-lg border border-border bg-surface p-1">
          {TABS.map(({ key, label }) => (
            <button
              key={key}
              type="button"
              onClick={() => setTab(key)}
              className={`cursor-pointer rounded-md px-4 py-1.5 text-sm font-medium transition-colors duration-200 ${
                tab === key ? 'bg-primary text-surface' : 'text-text-muted hover:text-text'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {tab === 'today' ? <DailyDashboard /> : <WeeklyDashboard />}
    </div>
  )
}
