import type { ReactNode } from 'react';
import type { ToolRegistryEntry } from '../data/toolRegistryTypes';
import type { ToolBlogMeta } from '../data/tool-blogs.handwritten';

export interface RelatedToolCard {
  title: string;
  description: string;
  path: string;
  icon: ReactNode;
}

/**
 * Everything CalculatorShell needs to render one specific tool page — resolved
 * server-side (see src/utils/resolveShellProps.tsx) from the tool's own
 * registry entry, and passed down via ShellPropsProvider. This keeps the full
 * 1,358-tool registry, category list, and tool-blogs data out of the client
 * bundle entirely: only this one tool's small, already-resolved slice ships
 * to the browser, not the machinery used to compute it.
 */
export interface ShellProps {
  entry: ToolRegistryEntry;
  relatedTools: RelatedToolCard[];
  blog: ToolBlogMeta | undefined;
}
