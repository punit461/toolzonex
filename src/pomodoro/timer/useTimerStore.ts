import { create } from 'zustand'
import { createIdleState, transition, type TimerState } from './timerMachine'
import type { Mode } from './modes'
import type { DistractionEvent, SessionRecord } from '../types/session'
import { computeFocusScore, type ScoreBreakdownEntry } from '../scoring/focusScore'
import { saveSession } from '../db/sessionsRepo'
import { useToastStore } from '../notifications/useToastStore'

const DISTRACTION_MESSAGES: Record<DistractionEvent['type'], string> = {
  'phone-usage': 'Phone usage detected',
  'away-from-screen': 'You stepped away from the screen',
  'looking-away': 'Looking away for a while — stay focused',
  'manual-report': 'Distraction logged',
}

interface TimerStore {
  timer: TimerState
  currentMode: Mode | null
  sessionId: string | null
  startTime: string | null
  distractionEvents: DistractionEvent[]
  /** Whether camera-based monitoring was actually active during this session
   *  (not just requested — reflects the real permission/runtime outcome). */
  cvEnabled: boolean
  /** Computed once the session ends; not yet written to IndexedDB until the
   *  user submits (or skips) the "what did you accomplish" prompt. */
  lastSession: SessionRecord | null
  lastScoreBreakdown: ScoreBreakdownEntry[]
  sessionSaved: boolean
  start: (mode: Mode) => void
  setCvEnabled: (enabled: boolean) => void
  pause: () => void
  resume: () => void
  skipBreak: () => void
  abandon: () => void
  reset: () => void
  recordDistractionEvent: (event: DistractionEvent) => void
  submitAccomplishment: (text: string) => Promise<void>
}

let intervalId: ReturnType<typeof setInterval> | null = null

function stopTicking() {
  if (intervalId !== null) {
    clearInterval(intervalId)
    intervalId = null
  }
}

function sumDurationByType(events: DistractionEvent[], type: DistractionEvent['type']): number {
  return events.filter((e) => e.type === type).reduce((total, e) => total + e.durationSec, 0)
}

export const useTimerStore = create<TimerStore>((set, get) => {
  function tick() {
    const next = transition(get().timer, { type: 'TICK', deltaSec: 1 })
    set({ timer: next })
    if (next.status === 'completed' || next.status === 'abandoned') {
      stopTicking()
      finalizeSession(next)
    }
  }

  function startTicking() {
    stopTicking()
    intervalId = setInterval(tick, 1000)
  }

  /** Computes the focus score and builds the session record for display —
   *  does not persist it yet, so the accomplishment prompt can still fill in
   *  `accomplishment` before it's written to IndexedDB. */
  function finalizeSession(timer: TimerState) {
    const state = get()
    if (!state.currentMode || !state.sessionId || !state.startTime) return

    const scoring = computeFocusScore({
      distractionEvents: state.distractionEvents,
      sessionCompleted: timer.status === 'completed',
    })

    const phoneUsageDurationSec = sumDurationByType(state.distractionEvents, 'phone-usage')
    const awayDurationSec = sumDurationByType(state.distractionEvents, 'away-from-screen')
    const lookingAwayDurationSec = sumDurationByType(state.distractionEvents, 'looking-away')
    const screenAttentionDurationSec = Math.max(
      0,
      timer.actualWorkSec - phoneUsageDurationSec - awayDurationSec - lookingAwayDurationSec,
    )

    const session: SessionRecord = {
      id: state.sessionId,
      mode: state.currentMode.id,
      modeLabel: state.currentMode.label,
      startTime: state.startTime,
      endTime: new Date().toISOString(),
      plannedWorkDurationSec: timer.plannedWorkSec,
      plannedBreakDurationSec: timer.plannedBreakSec,
      actualWorkDurationSec: timer.actualWorkSec,
      actualBreakDurationSec: timer.actualBreakSec,
      status: timer.status === 'completed' ? 'completed' : 'abandoned',
      focusScore: scoring.score,
      distractionEvents: state.distractionEvents,
      phoneUsageDurationSec,
      awayDurationSec,
      lookingAwayDurationSec,
      screenAttentionDurationSec,
      cvEnabled: state.cvEnabled,
      accomplishment: null,
    }

    set({ lastSession: session, lastScoreBreakdown: scoring.breakdown, sessionSaved: false })
  }

  return {
    timer: createIdleState(),
    currentMode: null,
    sessionId: null,
    startTime: null,
    distractionEvents: [],
    cvEnabled: false,
    lastSession: null,
    lastScoreBreakdown: [],
    sessionSaved: false,

    start: (mode) => {
      set({
        timer: transition(createIdleState(), { type: 'START', mode }),
        currentMode: mode,
        sessionId: crypto.randomUUID(),
        startTime: new Date().toISOString(),
        distractionEvents: [],
        cvEnabled: false,
        lastSession: null,
        lastScoreBreakdown: [],
        sessionSaved: false,
      })
      startTicking()
    },

    setCvEnabled: (enabled) => set({ cvEnabled: enabled }),

    pause: () => {
      stopTicking()
      set((s) => ({ timer: transition(s.timer, { type: 'PAUSE' }) }))
    },

    resume: () => {
      set((s) => ({ timer: transition(s.timer, { type: 'RESUME' }) }))
      startTicking()
    },

    skipBreak: () => {
      stopTicking()
      const next = transition(get().timer, { type: 'SKIP_BREAK' })
      set({ timer: next })
      if (next.status === 'completed') finalizeSession(next)
    },

    abandon: () => {
      stopTicking()
      const next = transition(get().timer, { type: 'ABANDON' })
      set({ timer: next })
      if (next.status === 'abandoned') finalizeSession(next)
    },

    reset: () => {
      stopTicking()
      set({
        timer: createIdleState(),
        currentMode: null,
        sessionId: null,
        startTime: null,
        distractionEvents: [],
        cvEnabled: false,
        lastSession: null,
        lastScoreBreakdown: [],
        sessionSaved: false,
      })
    },

    recordDistractionEvent: (event) => {
      set((s) => ({ distractionEvents: [...s.distractionEvents, event] }))
      useToastStore.getState().addToast(DISTRACTION_MESSAGES[event.type], 'warning')
    },

    submitAccomplishment: async (text) => {
      const { lastSession } = get()
      if (!lastSession) return

      const session: SessionRecord = { ...lastSession, accomplishment: text || null }
      await saveSession(session)
      set({ lastSession: session, sessionSaved: true })
    },
  }
})
