import type { ToolRegistryEntry } from '../data/toolRegistryTypes';
import { categories } from '../data/toolCategories';
import { getToolBlogByRoute } from '../data/tool-blogs';
import type { ShellProps, RelatedToolCard } from '../types/shellProps';

const RELATED_COUNT = 6;

/**
 * Picks a deterministic window of "next N" tools after the current one in
 * its category (wrapping around), rather than always the same first N --
 * this spreads internal links across every tool in the category instead of
 * funneling them all to a fixed handful. Deterministic (no randomness) so
 * it can't cause a hydration mismatch on this client component.
 */
function getRelatedTools(category: string, currentUrl: string): RelatedToolCard[] {
  const cat = categories.find((c) => c.label === category);
  if (!cat || cat.tools.length <= 1) return [];

  const currentIndex = cat.tools.findIndex((t) => t.path === currentUrl);
  const startIndex = currentIndex === -1 ? 0 : currentIndex + 1;
  const count = Math.min(RELATED_COUNT, cat.tools.length - 1);

  const related: RelatedToolCard[] = [];
  for (let i = 0; i < count; i++) {
    const tool = cat.tools[(startIndex + i) % cat.tools.length];
    if (tool.path !== currentUrl) related.push(tool);
  }
  return related;
}

/**
 * Server-only: resolves everything CalculatorShell needs for one tool page.
 * Call this from each tool's page.tsx (a Server Component, which already
 * imports its own `tool` entry for metadata) and pass the result down via
 * ShellPropsProvider. Never import this from a 'use client' file — that
 * would defeat the entire point, pulling the full registry back into the
 * client bundle.
 */
export function getShellProps(entry: ToolRegistryEntry): ShellProps {
  return {
    entry,
    relatedTools: getRelatedTools(entry.shellCategory, entry.route),
    blog: getToolBlogByRoute(entry.route),
  };
}
