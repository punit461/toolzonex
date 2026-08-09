'use client'

import { useEffect, useState } from 'react'
import { useTimerStore } from './timer/useTimerStore'
import { useCameraMonitoring } from './cv/useCameraMonitoring'
import { useSettingsStore } from './settings/useSettingsStore'
import { ModePicker } from './ModePicker'
import { ActiveSession } from './ActiveSession'
import { SessionSummary } from './SessionSummary'
import type { Mode } from './timer/modes'

export function TimerView() {
  const {
    timer,
    currentMode,
    distractionEvents,
    lastSession,
    lastScoreBreakdown,
    sessionSaved,
    start,
    pause,
    resume,
    skipBreak,
    abandon,
    reset,
    recordDistractionEvent,
    submitAccomplishment,
    setCvEnabled,
  } = useTimerStore()

  const { cvEnabledByDefault, cvSampleIntervalSec } = useSettingsStore()
  const [cvRequested, setCvRequested] = useState(cvEnabledByDefault)

  const sessionInProgress = timer.status === 'running' || timer.status === 'paused'
  const { status: cameraStatus } = useCameraMonitoring({
    enabled: cvRequested && sessionInProgress,
    sampleIntervalSec: cvSampleIntervalSec,
    onEvent: recordDistractionEvent,
  })

  useEffect(() => {
    setCvEnabled(cameraStatus === 'active')
  }, [cameraStatus, setCvEnabled])

  const handleSelectMode = (mode: Mode) => start(mode)

  const handleManualDistraction = () => {
    recordDistractionEvent({
      id: crypto.randomUUID(),
      type: 'manual-report',
      timestamp: new Date().toISOString(),
      durationSec: 0,
      confidence: 1,
    })
  }

  if (timer.status === 'idle') {
    return <ModePicker onSelect={handleSelectMode} cvRequested={cvRequested} onCvRequestedChange={setCvRequested} />
  }

  if (timer.status === 'completed' || timer.status === 'abandoned') {
    if (!lastSession) return null
    return (
      <SessionSummary
        status={timer.status}
        session={lastSession}
        breakdown={lastScoreBreakdown}
        saved={sessionSaved}
        onSubmitAccomplishment={submitAccomplishment}
        onStartAnother={reset}
      />
    )
  }

  return (
    <ActiveSession
      timer={timer}
      mode={currentMode}
      distractionCount={distractionEvents.length}
      cameraStatus={cameraStatus}
      onPause={pause}
      onResume={resume}
      onSkipBreak={skipBreak}
      onAbandon={abandon}
      onManualDistraction={handleManualDistraction}
    />
  )
}
