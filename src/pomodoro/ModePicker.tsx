import { useState, type FormEvent } from 'react'
import { Plus } from 'lucide-react'
import { BUILT_IN_MODES, createCustomMode, type Mode } from './timer/modes'
import { MODE_ACCENTS, MODE_ICONS } from './modeIcons'
import { Card } from './components/Card'
import { Switch } from './components/Switch'

interface ModePickerProps {
  onSelect: (mode: Mode) => void
  cvRequested: boolean
  onCvRequestedChange: (enabled: boolean) => void
}

export function ModePicker({ onSelect, cvRequested, onCvRequestedChange }: ModePickerProps) {
  const [showCustomForm, setShowCustomForm] = useState(false)
  const [customLabel, setCustomLabel] = useState('')
  const [customWork, setCustomWork] = useState(25)
  const [customBreak, setCustomBreak] = useState(5)

  const handleCustomSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!customLabel.trim()) return
    onSelect(createCustomMode(customLabel.trim(), customWork, customBreak))
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text">Choose a mode</h1>
        <p className="mt-1 text-sm text-text-muted">Pick how you want to work this session.</p>
      </div>

      <Card>
        <Switch
          checked={cvRequested}
          onChange={onCvRequestedChange}
          label="Focus monitoring for this session"
          description="Uses your camera locally to notice when you step away or pick up your phone. Nothing is uploaded or recorded."
        />
      </Card>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {BUILT_IN_MODES.map((mode) => {
          const Icon = MODE_ICONS[mode.id]
          const accent = MODE_ACCENTS[mode.id]
          return (
            <button
              key={mode.id}
              type="button"
              onClick={() => onSelect(mode)}
              className="group flex cursor-pointer flex-col items-start gap-3 rounded-2xl border border-border bg-surface p-6 text-left shadow-sm transition-all duration-200 hover:border-primary hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              <span className={`flex h-11 w-11 items-center justify-center rounded-xl ${accent.iconBg} ${accent.iconText}`}>
                <Icon className="h-5 w-5" strokeWidth={2.25} />
              </span>
              <span>
                <span className="block text-lg font-semibold text-text">{mode.label}</span>
                <span className="block text-sm text-text-muted">
                  {mode.workSec / 60}m focus / {mode.breakSec / 60}m break
                </span>
              </span>
              <span className="flex flex-wrap gap-1.5">
                {mode.trackingFields.map((field) => (
                  <span key={field} className="rounded-full bg-surface-muted px-2 py-0.5 text-xs text-text-muted">
                    {field}
                  </span>
                ))}
              </span>
            </button>
          )
        })}

        <button
          type="button"
          onClick={() => setShowCustomForm((v) => !v)}
          className="flex cursor-pointer flex-col items-start gap-3 rounded-2xl border border-dashed border-border bg-surface p-6 text-left shadow-sm transition-all duration-200 hover:border-primary hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-soft text-accent-hover">
            <Plus className="h-5 w-5" strokeWidth={2.25} />
          </span>
          <span>
            <span className="block text-lg font-semibold text-text">Custom mode</span>
            <span className="block text-sm text-text-muted">Set your own work / break durations</span>
          </span>
        </button>
      </div>

      {showCustomForm && (
        <Card>
          <form onSubmit={handleCustomSubmit} className="space-y-4">
            <h2 className="font-semibold text-text">Custom mode</h2>
            <div>
              <label className="block text-sm font-medium text-text-muted" htmlFor="custom-label">
                Name
              </label>
              <input
                id="custom-label"
                type="text"
                value={customLabel}
                onChange={(e) => setCustomLabel(e.target.value)}
                placeholder="e.g. Writing sprint"
                required
                className="mt-1 w-full rounded-lg border border-border bg-bg px-3 py-2 text-sm text-text outline-none transition-colors duration-200 focus:border-primary"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-text-muted" htmlFor="custom-work">
                  Work (minutes)
                </label>
                <input
                  id="custom-work"
                  type="number"
                  min={1}
                  max={180}
                  value={customWork}
                  onChange={(e) => setCustomWork(Number(e.target.value))}
                  className="mt-1 w-full rounded-lg border border-border bg-bg px-3 py-2 text-sm text-text outline-none transition-colors duration-200 focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-muted" htmlFor="custom-break">
                  Break (minutes)
                </label>
                <input
                  id="custom-break"
                  type="number"
                  min={0}
                  max={60}
                  value={customBreak}
                  onChange={(e) => setCustomBreak(Number(e.target.value))}
                  className="mt-1 w-full rounded-lg border border-border bg-bg px-3 py-2 text-sm text-text outline-none transition-colors duration-200 focus:border-primary"
                />
              </div>
            </div>
            <button
              type="submit"
              className="cursor-pointer rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-surface transition-colors duration-200 hover:bg-primary-hover"
            >
              Start custom session
            </button>
          </form>
        </Card>
      )}
    </div>
  )
}
