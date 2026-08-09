export type ScoreTone = 'success' | 'warning' | 'danger'

export function scoreTone(score: number): ScoreTone {
  if (score >= 80) return 'success'
  if (score >= 50) return 'warning'
  return 'danger'
}

export const scoreToneClasses: Record<ScoreTone, { text: string; bg: string; stroke: string }> = {
  success: { text: 'text-success', bg: 'bg-success-soft', stroke: 'stroke-success' },
  warning: { text: 'text-warning', bg: 'bg-warning-soft', stroke: 'stroke-warning' },
  danger: { text: 'text-danger', bg: 'bg-danger-soft', stroke: 'stroke-danger' },
}
