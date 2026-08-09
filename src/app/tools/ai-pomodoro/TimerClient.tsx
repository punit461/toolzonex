'use client'

import dynamic from 'next/dynamic'

// TensorFlow.js/MediaPipe touch camera/browser-only APIs and are heavy
// (~1MB+) — loaded only on the client, only for this route. `ssr: false`
// requires this to live in a Client Component (page.tsx stays a Server
// Component so it can still export `metadata`).
const TimerView = dynamic(() => import('@/pomodoro/TimerView').then((m) => m.TimerView), { ssr: false })

export default function TimerClient() {
  return <TimerView />
}
