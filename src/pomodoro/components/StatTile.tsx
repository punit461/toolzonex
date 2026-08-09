import type { LucideIcon } from 'lucide-react'

interface StatTileProps {
  icon: LucideIcon
  label: string
  value: string
  sublabel?: string
}

export function StatTile({ icon: Icon, label, value, sublabel }: StatTileProps) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-5 shadow-sm">
      <div className="flex items-center gap-2 text-text-muted">
        <Icon className="h-4 w-4" strokeWidth={2.25} />
        <span className="text-sm font-medium">{label}</span>
      </div>
      <p className="mt-2 truncate text-3xl font-bold text-text tabular-nums">{value}</p>
      {sublabel && <p className="mt-1 text-sm text-text-muted">{sublabel}</p>}
    </div>
  )
}
