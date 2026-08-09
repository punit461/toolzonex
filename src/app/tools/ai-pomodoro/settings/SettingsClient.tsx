'use client'

import dynamic from 'next/dynamic'

const SettingsView = dynamic(() => import('@/pomodoro/SettingsView').then((m) => m.SettingsView), { ssr: false })

export default function SettingsClient() {
  return <SettingsView />
}
