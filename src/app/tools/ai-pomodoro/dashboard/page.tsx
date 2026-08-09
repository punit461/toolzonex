import type { Metadata } from 'next'
import DashboardClient from './DashboardClient'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://punit461.github.io/toolzonex'

export const metadata: Metadata = {
  title: 'AI Pomodoro Dashboard - Focus & Productivity Analytics',
  description: 'Daily and weekly focus score trends, distraction counts, and productivity breakdowns for your Pomodoro sessions.',
  keywords: ['pomodoro dashboard', 'focus score', 'productivity analytics'],
  alternates: { canonical: '/tools/ai-pomodoro/dashboard' },
  openGraph: {
    title: 'AI Pomodoro Dashboard - Focus & Productivity Analytics | ToolZoneX',
    description: 'Daily and weekly focus score trends and productivity breakdowns.',
    url: `${SITE_URL}/tools/ai-pomodoro/dashboard`,
    type: 'article',
  },
}

export default function Page() {
  return <DashboardClient />
}
