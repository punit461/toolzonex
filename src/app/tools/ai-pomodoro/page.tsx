import type { Metadata } from 'next'
import TimerClient from './TimerClient'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://punit461.github.io/toolzonex'

export const metadata: Metadata = {
  title: 'AI Pomodoro - Focus Timer with Distraction Tracking',
  description:
    'A focus-aware Pomodoro timer with multiple productivity modes, in-browser distraction detection, and session analytics. Free, private, runs entirely in your browser.',
  keywords: ['pomodoro timer', 'focus timer', 'productivity timer', 'deep work timer', 'distraction tracking'],
  alternates: { canonical: '/tools/ai-pomodoro' },
  openGraph: {
    title: 'AI Pomodoro - Focus Timer with Distraction Tracking | ToolZoneX',
    description: 'A focus-aware Pomodoro timer with multiple productivity modes and in-browser distraction detection.',
    url: `${SITE_URL}/tools/ai-pomodoro`,
    type: 'article',
  },
}

const toolSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'AI Pomodoro',
  description: 'A focus-aware Pomodoro timer with in-browser distraction detection and session analytics.',
  url: `${SITE_URL}/tools/ai-pomodoro`,
  applicationCategory: 'ProductivityApplication',
  operatingSystem: 'Web Browser',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
}

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(toolSchema) }} />
      <TimerClient />
    </>
  )
}
