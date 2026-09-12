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
 */
const INDEXABLE_BLOG_SLUGS = new Set([
  'what-is-my-ip',              // 1342 impressions, 1 click
  'hex-to-rgb',                 //  823 impressions
  'image-color-picker',         //  269 impressions
  'uk-stamp-duty-calculator',   //  251 impressions
  'bmr-calculator',             //  178 impressions
  'retirement-calculator',      //  145 impressions
  'gold-calculator',            //  138 impressions
  'capital-gains-tax-calculator', // 131 impressions
]);

/** Whether a tool guide should be indexed by search engines. */
export function isToolBlogIndexable(slug: string): boolean {
  return INDEXABLE_BLOG_SLUGS.has(slug);
}
