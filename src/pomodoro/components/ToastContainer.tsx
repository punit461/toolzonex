'use client'

import { AlertTriangle, Info, X } from 'lucide-react'
import { useToastStore, type ToastTone } from '../notifications/useToastStore'

const TONE_STYLES: Record<ToastTone, { icon: typeof Info; className: string }> = {
  warning: { icon: AlertTriangle, className: 'border-warning/30 bg-warning-soft text-warning' },
  danger: { icon: AlertTriangle, className: 'border-danger/30 bg-danger-soft text-danger' },
  info: { icon: Info, className: 'border-border bg-surface text-text' },
}

export function ToastContainer() {
  const { toasts, dismissToast } = useToastStore()

  if (toasts.length === 0) return null

  return (
    // z-[1500]: ToolZoneX's MUI header/drawer/modal layers sit in the
    // 1100-1400 range — Tailwind's default max (z-50) would render these
    // underneath them, so this needs to explicitly clear that.
    <div className="fixed top-20 right-4 z-[1500] flex flex-col gap-2">
      {toasts.map((toast) => {
        const { icon: Icon, className } = TONE_STYLES[toast.tone]
        return (
          <div
            key={toast.id}
            role="status"
            className={`flex items-center gap-2 rounded-lg border px-4 py-3 text-sm font-medium shadow-lg transition-colors duration-200 ${className}`}
          >
            <Icon className="h-4 w-4 shrink-0" strokeWidth={2.25} />
            {toast.message}
            <button
              type="button"
              onClick={() => dismissToast(toast.id)}
              aria-label="Dismiss"
              className="cursor-pointer text-text-muted transition-colors duration-200 hover:text-text"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        )
      })}
    </div>
  )
}
