import type { ReactNode } from 'react';
import { toolRegistry } from './toolRegistry';

// Single source of truth for the homepage tool grid (src/app/page.tsx)
// AND the header nav (src/components/Header.tsx, which derives its nav
// groups from these categories -- see NAV_GROUPS in Header.tsx). This is
// now derived from src/data/toolRegistry.tsx -- add a tool there once and
// it appears here (and in the homepage/nav) automatically. Adding a
// brand-new navCategory label? Add a matching entry to NAV_GROUPS in
// Header.tsx too, or it won't be reachable from the nav.
export interface ToolEntry {
  title: string;
  description: string;
  path: string;
  icon: ReactNode;
}

export interface ToolCategory {
  label: string;
  color: string;
  tools: ToolEntry[];
}

const CATEGORY_COLORS: Record<string, string> = {
  Finance: '#1a56db',
  'Paycheck Calculators': '#65a30d',
  Health: '#057a55',
  'Time & Productivity': '#eab308',
  Utilities: '#7e3af2',
  Screens: '#0d9488',
  Tools: '#c27803',
  'PDF Tools': '#dc2626',
  'Text Tools': '#0284c7',
  Generators: '#e11d48',
  Converters: '#8b5cf6',
  'Developer Tools': '#0ea5e9',
  AI: '#7c3aed',
};

// Preserves the category order and per-category tool order that the
// hand-written list had, since toolRegistry.tsx's entries were generated in
// that same order -- grouping by first-seen order reproduces it exactly.
function buildCategories(): ToolCategory[] {
  const order: string[] = [];
  const byLabel = new Map<string, ToolEntry[]>();

  for (const tool of toolRegistry) {
    if (!byLabel.has(tool.navCategory)) {
      byLabel.set(tool.navCategory, []);
      order.push(tool.navCategory);
    }
    byLabel.get(tool.navCategory)!.push({
      title: tool.navName,
      description: tool.navDescription,
      path: tool.route,
      icon: tool.icon,
    });
  }

  return order.map((label) => ({
    label,
    color: CATEGORY_COLORS[label] ?? '#000000',
    tools: byLabel.get(label)!,
  }));
}

export const categories: ToolCategory[] = buildCategories();
