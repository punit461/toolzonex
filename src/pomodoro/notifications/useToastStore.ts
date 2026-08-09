import { create } from 'zustand'
import { playAlertSound } from './playAlertSound'

export type ToastTone = 'warning' | 'danger' | 'info'

export interface Toast {
  id: string
  message: string
  tone: ToastTone
}

interface ToastStore {
  toasts: Toast[]
  addToast: (message: string, tone?: ToastTone) => void
  dismissToast: (id: string) => void
}

const AUTO_DISMISS_MS = 5000

export const useToastStore = create<ToastStore>((set) => ({
  toasts: [],

  addToast: (message, tone = 'info') => {
    const id = crypto.randomUUID()
    set((s) => ({ toasts: [...s.toasts, { id, message, tone }] }))
    if (tone !== 'info') playAlertSound()
    setTimeout(() => {
      set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) }))
    }, AUTO_DISMISS_MS)
  },

  dismissToast: (id) => set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),
}))
