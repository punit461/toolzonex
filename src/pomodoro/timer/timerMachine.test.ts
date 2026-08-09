import { describe, expect, it } from 'vitest'
import { createIdleState, transition } from './timerMachine'
import type { Mode } from './modes'

const mode: Mode = {
  id: 'deep-work',
  label: 'Deep Work',
  workSec: 5,
  breakSec: 3,
  trackingFields: [],
}

const noBreakMode: Mode = { ...mode, id: 'custom', breakSec: 0 }

describe('timerMachine', () => {
  it('starts in idle', () => {
    expect(createIdleState().status).toBe('idle')
  })

  it('START begins the work phase at full duration', () => {
    const state = transition(createIdleState(), { type: 'START', mode })
    expect(state.status).toBe('running')
    expect(state.phase).toBe('work')
    expect(state.remainingSec).toBe(5)
  })

  it('PAUSE then RESUME preserves the exact remaining time', () => {
    let state = transition(createIdleState(), { type: 'START', mode })
    state = transition(state, { type: 'TICK', deltaSec: 2 })
    expect(state.remainingSec).toBe(3)

    state = transition(state, { type: 'PAUSE' })
    expect(state.status).toBe('paused')

    // ticks while paused must be ignored
    const pausedState = transition(state, { type: 'TICK', deltaSec: 10 })
    expect(pausedState.remainingSec).toBe(3)
    expect(pausedState.status).toBe('paused')

    state = transition(state, { type: 'RESUME' })
    expect(state.status).toBe('running')
    expect(state.remainingSec).toBe(3)
  })

  it('transitions from work to break when work runs out', () => {
    let state = transition(createIdleState(), { type: 'START', mode })
    state = transition(state, { type: 'TICK', deltaSec: 5 })
    expect(state.phase).toBe('break')
    expect(state.status).toBe('running')
    expect(state.remainingSec).toBe(3)
    expect(state.actualWorkSec).toBe(5)
  })

  it('completes after the break finishes', () => {
    let state = transition(createIdleState(), { type: 'START', mode })
    state = transition(state, { type: 'TICK', deltaSec: 5 }) // -> break
    state = transition(state, { type: 'TICK', deltaSec: 3 }) // break ends
    expect(state.status).toBe('completed')
    expect(state.actualWorkSec).toBe(5)
    expect(state.actualBreakSec).toBe(3)
  })

  it('goes straight to completed when the mode has no break', () => {
    let state = transition(createIdleState(), { type: 'START', mode: noBreakMode })
    state = transition(state, { type: 'TICK', deltaSec: 5 })
    expect(state.status).toBe('completed')
    expect(state.actualWorkSec).toBe(5)
    expect(state.actualBreakSec).toBe(0)
  })

  it('SKIP_BREAK completes immediately and records the partial break taken', () => {
    let state = transition(createIdleState(), { type: 'START', mode })
    state = transition(state, { type: 'TICK', deltaSec: 5 }) // -> break, remaining 3
    state = transition(state, { type: 'TICK', deltaSec: 1 }) // remaining 2
    state = transition(state, { type: 'SKIP_BREAK' })
    expect(state.status).toBe('completed')
    expect(state.actualBreakSec).toBe(1)
  })

  it('ABANDON mid-work records only the elapsed work time', () => {
    let state = transition(createIdleState(), { type: 'START', mode })
    state = transition(state, { type: 'TICK', deltaSec: 2 })
    state = transition(state, { type: 'ABANDON' })
    expect(state.status).toBe('abandoned')
    expect(state.actualWorkSec).toBe(2)
    expect(state.actualBreakSec).toBe(0)
  })

  it('ABANDON mid-break records full work plus elapsed break', () => {
    let state = transition(createIdleState(), { type: 'START', mode })
    state = transition(state, { type: 'TICK', deltaSec: 5 }) // -> break
    state = transition(state, { type: 'TICK', deltaSec: 1 })
    state = transition(state, { type: 'ABANDON' })
    expect(state.status).toBe('abandoned')
    expect(state.actualWorkSec).toBe(5)
    expect(state.actualBreakSec).toBe(1)
  })

  it('ignores START while already running', () => {
    const state = transition(createIdleState(), { type: 'START', mode })
    const restarted = transition(state, { type: 'START', mode: noBreakMode })
    expect(restarted).toBe(state)
  })

  it('RESET returns to idle from any state', () => {
    let state = transition(createIdleState(), { type: 'START', mode })
    state = transition(state, { type: 'ABANDON' })
    state = transition(state, { type: 'RESET' })
    expect(state).toEqual(createIdleState())
  })
})
