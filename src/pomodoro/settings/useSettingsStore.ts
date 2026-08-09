import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const MIN_CV_INTERVAL_SEC = 2
export const MAX_CV_INTERVAL_SEC = 30
export const DEFAULT_CV_INTERVAL_SEC = 5

interface SettingsStore {
  /** Default preference for whether camera-based focus monitoring is offered
   *  before a session starts. Denying the browser permission prompt still
   *  disables it for that session regardless of this setting. */
  cvEnabledByDefault: boolean
  /** How often (seconds) the CV pipeline samples a frame. Lower = more
   *  responsive detection but more CPU/battery cost; higher = cheaper but
   *  slower to notice a distraction. */
  cvSampleIntervalSec: number
  setCvEnabledByDefault: (enabled: boolean) => void
  setCvSampleIntervalSec: (seconds: number) => void
}

function clampInterval(seconds: number): number {
  if (Number.isNaN(seconds)) return DEFAULT_CV_INTERVAL_SEC
  return Math.min(MAX_CV_INTERVAL_SEC, Math.max(MIN_CV_INTERVAL_SEC, Math.round(seconds)))
}

export const useSettingsStore = create<SettingsStore>()(
  persist(
    (set) => ({
      cvEnabledByDefault: false,
      cvSampleIntervalSec: DEFAULT_CV_INTERVAL_SEC,
      setCvEnabledByDefault: (enabled) => set({ cvEnabledByDefault: enabled }),
      setCvSampleIntervalSec: (seconds) => set({ cvSampleIntervalSec: clampInterval(seconds) }),
    }),
    { name: 'ai-pomodoro-settings' },
  ),
)
