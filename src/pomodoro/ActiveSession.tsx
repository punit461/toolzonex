import { Camera, CameraOff, Loader2, Pause, Play, Smartphone, SkipForward, XCircle } from 'lucide-react'
import { CircularProgress } from './components/CircularProgress'
import type { CameraStatus } from './cv/useCameraMonitoring'
import type { TimerState } from './timer/timerMachine'
import type { Mode } from './timer/modes'

interface ActiveSessionProps {
  timer: TimerState
  mode: Mode | null
  distractionCount: number
  cameraStatus: CameraStatus
  onPause: () => void
  onResume: () => void
  onSkipBreak: () => void
  onAbandon: () => void
  onManualDistraction: () => void
}

function formatTime(totalSec: number): string {
  const m = Math.floor(totalSec / 60)
  const s = totalSec % 60
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
}

const CAMERA_BADGE: Record<CameraStatus, { label: string; icon: typeof Camera; className: string } | null> = {
  idle: null,
  requesting: { label: 'Starting camera…', icon: Loader2, className: 'bg-surface-muted text-text-muted' },
  active: { label: 'Focus monitoring active', icon: Camera, className: 'bg-success-soft text-success' },
  denied: { label: 'Camera permission denied', icon: CameraOff, className: 'bg-warning-soft text-warning' },
  unavailable: { label: 'Camera unavailable', icon: CameraOff, className: 'bg-warning-soft text-warning' },
  error: { label: 'Camera error', icon: CameraOff, className: 'bg-danger-soft text-danger' },
}

export function ActiveSession({
  timer,
  mode,
  distractionCount,
  cameraStatus,
  onPause,
  onResume,
  onSkipBreak,
  onAbandon,
  onManualDistraction,
}: ActiveSessionProps) {
  const plannedSec = timer.phase === 'work' ? timer.plannedWorkSec : timer.plannedBreakSec
  const progress = plannedSec > 0 ? 1 - timer.remainingSec / plannedSec : 0
  const badge = CAMERA_BADGE[cameraStatus]

  return (
    <div className="flex flex-col items-center gap-6 py-6 text-center">
      <div>
        <span className="text-sm font-medium tracking-wide text-text-muted uppercase">{mode?.label}</span>
        <div>
          <span
            className={`mt-1 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-semibold ${
              timer.phase === 'work' ? 'bg-primary-soft text-primary-hover' : 'bg-accent-soft text-accent-hover'
            }`}
          >
            {timer.status === 'running' && (
              <span
                className={`h-1.5 w-1.5 rounded-full ${timer.phase === 'work' ? 'bg-primary' : 'bg-accent'} animate-pulse`}
              />
            )}
            {timer.phase === 'work' ? 'Focus' : 'Break'}
          </span>
        </div>
      </div>

      <div className="relative flex items-center justify-center">
        <div
          className={`absolute h-64 w-64 rounded-full opacity-30 blur-3xl ${
            timer.phase === 'work' ? 'bg-primary' : 'bg-accent'
          }`}
          aria-hidden="true"
        />
        <CircularProgress
          progress={progress}
          size={300}
          strokeWidth={16}
          colorClassName={timer.phase === 'work' ? 'stroke-primary' : 'stroke-accent'}
        >
          <span className="font-mono text-6xl font-bold text-text tabular-nums">{formatTime(timer.remainingSec)}</span>
        </CircularProgress>
      </div>

      {badge && (
        <div className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-medium ${badge.className}`}>
          <badge.icon className={`h-4 w-4 ${cameraStatus === 'requesting' ? 'animate-spin' : ''}`} strokeWidth={2.25} />
          {badge.label}
        </div>
      )}

      <div className="flex flex-wrap items-center justify-center gap-3">
        {timer.status === 'running' ? (
          <button
            onClick={onPause}
            className="flex cursor-pointer items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-surface transition-colors duration-200 hover:bg-primary-hover"
          >
            <Pause className="h-4 w-4" strokeWidth={2.5} /> Pause
          </button>
        ) : (
          <button
            onClick={onResume}
            className="flex cursor-pointer items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-surface transition-colors duration-200 hover:bg-primary-hover"
          >
            <Play className="h-4 w-4" strokeWidth={2.5} /> Resume
          </button>
        )}

        {timer.phase === 'break' && timer.status === 'running' && (
          <button
            onClick={onSkipBreak}
            className="flex cursor-pointer items-center gap-2 rounded-full border border-border bg-surface px-5 py-2.5 text-sm font-semibold text-text transition-colors duration-200 hover:bg-surface-muted"
          >
            <SkipForward className="h-4 w-4" strokeWidth={2.5} /> Skip break
          </button>
        )}

        {timer.phase === 'work' && timer.status === 'running' && (
          <button
            onClick={onManualDistraction}
            className="flex cursor-pointer items-center gap-2 rounded-full border border-warning/40 bg-warning-soft px-5 py-2.5 text-sm font-semibold text-warning transition-colors duration-200 hover:bg-warning/20"
          >
            <Smartphone className="h-4 w-4" strokeWidth={2.5} /> I got distracted
          </button>
        )}

        <button
          onClick={onAbandon}
          className="flex cursor-pointer items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-text-muted transition-colors duration-200 hover:bg-danger-soft hover:text-danger"
        >
          <XCircle className="h-4 w-4" strokeWidth={2.5} /> Abandon
        </button>
      </div>

      <p className="text-sm text-text-muted">
        Distractions logged this session: <span className="font-semibold text-text">{distractionCount}</span>
      </p>
    </div>
  )
}
