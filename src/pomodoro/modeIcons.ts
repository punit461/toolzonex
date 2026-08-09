import { Brain, BookOpen, Briefcase, Code2, Rocket, Sparkles, type LucideIcon } from 'lucide-react'
import type { ModeId } from './types/session'

export const MODE_ICONS: Record<ModeId, LucideIcon> = {
  'deep-work': Brain,
  learning: BookOpen,
  'coding-sprint': Code2,
  'interview-prep': Briefcase,
  'side-hustle': Rocket,
  custom: Sparkles,
}

/** Distinct icon-badge colors per mode so the picker reads as more than a
 *  wall of identical teal cards — stays within the existing palette. */
export const MODE_ACCENTS: Record<ModeId, { iconBg: string; iconText: string }> = {
  'deep-work': { iconBg: 'bg-primary-soft', iconText: 'text-primary-hover' },
  learning: { iconBg: 'bg-secondary/15', iconText: 'text-secondary' },
  'coding-sprint': { iconBg: 'bg-accent-soft', iconText: 'text-accent-hover' },
  'interview-prep': { iconBg: 'bg-success-soft', iconText: 'text-success' },
  'side-hustle': { iconBg: 'bg-warning-soft', iconText: 'text-warning' },
  custom: { iconBg: 'bg-accent-soft', iconText: 'text-accent-hover' },
}
