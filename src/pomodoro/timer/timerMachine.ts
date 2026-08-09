import type { Mode } from './modes'

export type TimerPhase = 'work' | 'break'
export type TimerStatus = 'idle' | 'running' | 'paused' | 'completed' | 'abandoned'

export interface TimerState {
  status: TimerStatus
  phase: TimerPhase
  modeId: Mode['id'] | null
  plannedWorkSec: number
  plannedBreakSec: number
  remainingSec: number
  actualWorkSec: number
  actualBreakSec: number
}

export type TimerEvent =
  | { type: 'START'; mode: Mode }
  | { type: 'PAUSE' }
  | { type: 'RESUME' }
  | { type: 'TICK'; deltaSec: number }
  | { type: 'SKIP_BREAK' }
  | { type: 'ABANDON' }
  | { type: 'RESET' }

export function createIdleState(): TimerState {
  return {
    status: 'idle',
    phase: 'work',
    modeId: null,
    plannedWorkSec: 0,
    plannedBreakSec: 0,
    remainingSec: 0,
    actualWorkSec: 0,
    actualBreakSec: 0,
  }
}

export function transition(state: TimerState, event: TimerEvent): TimerState {
  switch (event.type) {
    case 'START': {
      if (state.status === 'running' || state.status === 'paused') return state
      return {
        status: 'running',
        phase: 'work',
        modeId: event.mode.id,
        plannedWorkSec: event.mode.workSec,
        plannedBreakSec: event.mode.breakSec,
        remainingSec: event.mode.workSec,
        actualWorkSec: 0,
        actualBreakSec: 0,
      }
    }

    case 'PAUSE': {
      if (state.status !== 'running') return state
      return { ...state, status: 'paused' }
    }

    case 'RESUME': {
      if (state.status !== 'paused') return state
      return { ...state, status: 'running' }
    }

    case 'TICK': {
      if (state.status !== 'running') return state
      const remaining = state.remainingSec - event.deltaSec

      if (remaining > 0) {
        return { ...state, remainingSec: remaining }
      }

      if (state.phase === 'work') {
        const finishedState = { ...state, actualWorkSec: state.plannedWorkSec }
        if (state.plannedBreakSec <= 0) {
          return { ...finishedState, status: 'completed', remainingSec: 0 }
        }
        return {
          ...finishedState,
          phase: 'break',
          remainingSec: state.plannedBreakSec,
        }
      }

      // phase === 'break'
      return {
        ...state,
        status: 'completed',
        remainingSec: 0,
        actualBreakSec: state.plannedBreakSec,
      }
    }

    case 'SKIP_BREAK': {
      if (state.status !== 'running' || state.phase !== 'break') return state
      return {
        ...state,
        status: 'completed',
        remainingSec: 0,
        actualBreakSec: state.plannedBreakSec - state.remainingSec,
      }
    }

    case 'ABANDON': {
      if (state.status !== 'running' && state.status !== 'paused') return state
      if (state.phase === 'work') {
        return {
          ...state,
          status: 'abandoned',
          actualWorkSec: state.plannedWorkSec - state.remainingSec,
        }
      }
      return {
        ...state,
        status: 'abandoned',
        actualWorkSec: state.plannedWorkSec,
        actualBreakSec: state.plannedBreakSec - state.remainingSec,
      }
    }

    case 'RESET':
      return createIdleState()

    default:
      return state
  }
}
