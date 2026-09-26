import '@/pomodoro/pomodoro.css'
import { PomodoroNav } from '@/pomodoro/PomodoroNav'
import { ToastContainer } from '@/pomodoro/components/ToastContainer'

export default function AIPomodoroLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="pomodoro-root rounded-2xl p-4 sm:p-6">
      {/* No Google Fonts request here: loading fonts from Google's CDN sends
       * every visitor's IP address to Google, which EU courts have treated
       * as a GDPR breach without consent. pomodoro.css uses the site's own
       * self-hosted Geist font instead. */}
      <h1 className="sr-only">AI Pomodoro — Focus Timer with Distraction Tracking</h1>
      <PomodoroNav />
      {children}
      <ToastContainer />
    </div>
  )
}
