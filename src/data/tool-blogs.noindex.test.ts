import fs from 'node:fs';
import path from 'node:path';
import { describe, it, expect } from 'vitest';
import { allToolBlogs, isToolBlogIndexable } from './tool-blogs';

// The registry entries carry JSX icons this vitest setup has no transform for,
// so read the entry files as text rather than importing them.
const TOOLS_DIR = path.join(__dirname, 'tools');
const entrySources = fs.readdirSync(TOOLS_DIR).map((f) => fs.readFileSync(path.join(TOOLS_DIR, f), 'utf8'));
function registryEntrySource(route: string): string | undefined {
  return entrySources.find((src) => src.includes(`route: "${route}"`));
}

/**
 * Companion to toolSeo.noindex.test.ts, for the second half of the index
 * cleanup: the 262 templated tool guides under /blog/tools/. Since 2026-09-26
 * none of them are indexed -- each query consolidates on the tool page itself.
 */

// Guides that were indexed until 2026-09-26 in place of (or alongside) their
// tool. Their tool pages must now be indexable, or those queries lose their
// only indexed page.
const FORMER_KEEPERS = [
  'what-is-my-ip',
  'hex-to-rgb',
  'image-color-picker',
  'uk-stamp-duty-calculator',
  'bmr-calculator',
  'retirement-calculator',
  'gold-calculator',
  'capital-gains-tax-calculator',
];

describe('tool guide indexability', () => {
  it('noindexes every tool guide', () => {
    expect(allToolBlogs.filter((b) => isToolBlogIndexable(b.slug))).toEqual([]);
    expect(allToolBlogs.length).toBeGreaterThan(200);
  });

  it.each(FORMER_KEEPERS)('the tool behind the former %s guide is indexable', (slug) => {
    const blog = allToolBlogs.find((b) => b.slug === slug);
    expect(blog, `guide ${slug} no longer exists`).toBeDefined();
    const entry = registryEntrySource(blog!.toolRoute);
    expect(entry, `no registry entry for ${blog!.toolRoute}`).toBeDefined();
    expect(entry).not.toMatch(/noindex:\s*true/);
  });
});
