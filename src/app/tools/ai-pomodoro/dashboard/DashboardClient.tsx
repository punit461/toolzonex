'use client'

import dynamic from 'next/dynamic'

const DashboardView = dynamic(() => import('@/pomodoro/DashboardView').then((m) => m.DashboardView), { ssr: false })

export default function DashboardClient() {
  return <DashboardView />
}
