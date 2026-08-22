/**
 * Blog metadata for every tool on ToolZoneX.
 * Used by the dynamic route at /blog/tools/[slug] and the BlogList page.
 *
 * Split into two source files: hand-written entries in tool-blogs.handwritten.ts
 * and auto-generated entries in tool-blogs.generated.ts. This file combines them.
 */
export type { ToolBlogMeta } from './tool-blogs.handwritten';
import type { ToolBlogMeta } from './tool-blogs.handwritten';
import { toolBlogs } from './tool-blogs.handwritten';
import { generatedBlogs } from './tool-blogs.generated';

export { toolBlogs };

/** All tool blogs: handwritten + generated */
export const allToolBlogs: ToolBlogMeta[] = [...toolBlogs, ...generatedBlogs];

/** Lookup by slug */
export function getToolBlogBySlug(slug: string): ToolBlogMeta | undefined {
  return allToolBlogs.find(b => b.slug === slug);
}

/** Lookup by the tool's own route (e.g. "/finance/emi-calculator"), for backlinking from the tool page to its blog. */
export function getToolBlogByRoute(route: string): ToolBlogMeta | undefined {
  return allToolBlogs.find(b => b.toolRoute === route);
}

/** All slugs for generateStaticParams */
export function getAllToolBlogSlugs(): string[] {
  return allToolBlogs.map(b => b.slug);
}
