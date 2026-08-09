'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Settings, Timer } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

const BASE = '/tools/ai-pomodoro'

const NAV_ITEMS: { href: string; label: string; icon: LucideIcon }[] = [
  { href: BASE, label: 'Timer', icon: Timer },
  { href: `${BASE}/dashboard`, label: 'Dashboard', icon: LayoutDashboard },
  { href: `${BASE}/settings`, label: 'Settings', icon: Settings },
]

/** A lightweight in-page tab bar — not a full app-shell header, since
 *  ToolZoneX's real site Header already provides branding and main nav. */
export function PomodoroNav() {
  const pathname = usePathname()

  return (
    <nav className="mb-6 inline-flex items-center gap-1 rounded-lg border border-border bg-surface p-1">
      {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
        const isActive = href === BASE ? pathname === BASE : pathname?.startsWith(href)
        return (
          <Link
            key={href}
            href={href}
            className={`flex cursor-pointer items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors duration-200 ${
              isActive ? 'bg-primary text-surface' : 'text-text-muted hover:bg-surface-muted hover:text-text'
            }`}
          >
            <Icon className="h-4 w-4" strokeWidth={2.25} />
            {label}
          </Link>
        )
      })}
    </nav>
  )
}
