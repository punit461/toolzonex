'use client'

import { ShieldCheck } from 'lucide-react'
import { Card } from './components/Card'
import { Switch } from './components/Switch'
import { MAX_CV_INTERVAL_SEC, MIN_CV_INTERVAL_SEC, useSettingsStore } from './settings/useSettingsStore'

export function SettingsView() {
  const { cvEnabledByDefault, cvSampleIntervalSec, setCvEnabledByDefault, setCvSampleIntervalSec } =
    useSettingsStore()

  return (
    <div className="mx-auto max-w-xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text">Settings</h1>
        <p className="mt-1 text-sm text-text-muted">Control focus monitoring and performance.</p>
      </div>

      <Card className="divide-y divide-border">
        <Switch
          checked={cvEnabledByDefault}
          onChange={setCvEnabledByDefault}
          label="Focus monitoring by default"
          description="Offer camera-based distraction detection when starting a new session. You can still turn it on or off per session."
        />

        <div className="flex items-center justify-between gap-4 py-3">
          <div>
            <label htmlFor="cv-interval" className="block text-sm font-medium text-text">
              Detection interval
            </label>
            <p className="mt-0.5 text-sm text-text-muted">
              How often (seconds) to check for distractions. Lower catches things faster but uses more CPU.
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <input
              id="cv-interval"
              type="number"
              min={MIN_CV_INTERVAL_SEC}
              max={MAX_CV_INTERVAL_SEC}
              value={cvSampleIntervalSec}
              onChange={(e) => setCvSampleIntervalSec(Number(e.target.value))}
              className="w-16 rounded-lg border border-border bg-bg px-2 py-1.5 text-center text-sm text-text outline-none transition-colors duration-200 focus:border-primary"
            />
            <span className="text-sm text-text-muted">sec</span>
          </div>
        </div>
      </Card>

      <Card className="flex gap-3 bg-primary-soft/40">
        <ShieldCheck className="h-5 w-5 shrink-0 text-primary" strokeWidth={2.25} />
        <div className="text-sm text-text-muted">
          <p className="font-medium text-text">Your camera never leaves your browser.</p>
          <p className="mt-1">
            Frames are analyzed locally to detect face presence and phone usage — nothing is uploaded, recorded, or
            sent to a server. Denying the camera permission just disables this feature; the timer and focus scoring
            keep working normally.
          </p>
        </div>
      </Card>
    </div>
  )
}
