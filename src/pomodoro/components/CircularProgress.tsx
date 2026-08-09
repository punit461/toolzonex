import type { ReactNode } from 'react'

interface CircularProgressProps {
  /** 0-1 */
  progress: number
  size?: number
  strokeWidth?: number
  colorClassName?: string
  trackClassName?: string
  children?: ReactNode
}

export function CircularProgress({
  progress,
  size = 240,
  strokeWidth = 12,
  colorClassName = 'stroke-primary',
  trackClassName = 'stroke-border',
  children,
}: CircularProgressProps) {
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const clamped = Math.min(1, Math.max(0, progress))
  const offset = circumference * (1 - clamped)

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} strokeWidth={strokeWidth} fill="none" className={trackClassName} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className={`${colorClassName} transition-[stroke-dashoffset] duration-1000 ease-linear`}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">{children}</div>
    </div>
  )
}
