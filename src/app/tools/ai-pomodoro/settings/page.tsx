import type { Metadata } from 'next'
import SettingsClient from './SettingsClient'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://punit461.github.io/toolzonex'

export const metadata: Metadata = {
  title: 'AI Pomodoro Settings - Focus Monitoring Preferences',
  description: 'Control camera-based focus monitoring and detection interval for the AI Pomodoro timer.',
  alternates: { canonical: '/tools/ai-pomodoro/settings' },
  openGraph: {
    title: 'AI Pomodoro Settings | ToolZoneX',
    description: 'Control camera-based focus monitoring and detection interval.',
    url: `${SITE_URL}/tools/ai-pomodoro/settings`,
    type: 'article',
  },
}

export default function Page() {
  return <SettingsClient />
}
