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

/**
 * The only tool guides left indexable, by Search Console demand over 2026-03-09
 * to 2026-09-09: every guide with a click or >=100 impressions. The other 254
 * are templated one-per-tool pages that largely duplicate the tool page they
 * describe — exactly the "Duplicate, Google chose different canonical" and
 * "Discovered - currently not indexed" buckets GSC is reporting — so they stay
 * live and linked but withheld from the index, matching the `noindex` flag now
 * carried by ~1,240 registry tools (see toolRegistryTypes.ts for the full
 * rationale).
 *
 * Same dial: add a slug here the moment it shows real demand.
 *
 * 2026-09-26: emptied. The 8 guides kept on 2026-09-12 earned their
 * impressions at positions 65-94 and one click between them, while splitting
 * the same queries with the tool page they describe (bmr, gold, retirement and
 * uk-stamp-duty had both indexed) or standing in for a tool page that had been
 * noindexed (what-is-my-ip, hex-to-rgb, image-color-picker and
 * capital-gains-tax-calculator — those four tools are indexed again instead).
 * Someone searching "hex to rgb" wants the converter, not an article about it,
 * so every query now consolidates on the tool page.
 */
const INDEXABLE_BLOG_SLUGS = new Set<string>([]);

/** Whether a tool guide should be indexed by search engines. */
export function isToolBlogIndexable(slug: string): boolean {
  return INDEXABLE_BLOG_SLUGS.has(slug);
}
