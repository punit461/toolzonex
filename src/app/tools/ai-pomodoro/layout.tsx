import '@/pomodoro/pomodoro.css'
import { PomodoroNav } from '@/pomodoro/PomodoroNav'
import { ToastContainer } from '@/pomodoro/components/ToastContainer'

export default function AIPomodoroLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="pomodoro-root rounded-2xl p-4 sm:p-6">
      {/* Rendered here (not the root <head>) — React 19 hoists <link> tags
       * from anywhere in the tree, and next/font/google requires build-time
       * network access to Google's CDN, which isn't guaranteed in every
       * build environment. This fetches at runtime in the browser instead,
       * same approach the original standalone app used. */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
        rel="stylesheet"
      />
      <PomodoroNav />
      {children}
      <ToastContainer />
    </div>
  )
}
