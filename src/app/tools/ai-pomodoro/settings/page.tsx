import type { Metadata } from 'next'
import SettingsClient from './SettingsClient'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com'

export const metadata: Metadata = {
  title: 'AI Pomodoro Settings - Focus Monitoring Preferences',
  description: 'Control camera-based focus monitoring and detection interval for the AI Pomodoro timer.',
  alternates: { canonical: '/tools/ai-pomodoro/settings' },
  // A settings panel for the timer, not something anyone searches for.
  robots: { index: false, follow: true },
  openGraph: {
    title: 'AI Pomodoro Settings | ToolZoneX',
    description: 'Control camera-based focus monitoring and detection interval.',
    url: `${SITE_URL}/tools/ai-pomodoro/settings`,
    type: 'article',
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
}

export default function Page() {
  return <SettingsClient />
}
