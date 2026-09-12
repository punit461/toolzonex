import { describe, it, expect } from 'vitest';
import { allToolBlogs, isToolBlogIndexable } from './tool-blogs';

/**
 * Companion to toolSeo.noindex.test.ts, for the second half of the 2026-09-12
 * index cleanup: the 262 templated tool guides under /blog/tools/. Same
 * asymmetry applies — silently dropping a keeper out of the index is the
 * expensive mistake — so the keeper slugs are asserted by name.
 */

const KEEPERS = [
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
  it.each(KEEPERS)('keeps %s indexable', (slug) => {
    expect(isToolBlogIndexable(slug)).toBe(true);
  });

  it('every keeper slug still resolves to a real guide', () => {
    // Guards against a rename silently turning a keeper into a dead entry,
    // which would noindex a page that is actually earning impressions.
    const slugs = new Set(allToolBlogs.map((b) => b.slug));
    expect(KEEPERS.filter((s) => !slugs.has(s))).toEqual([]);
  });

  it('noindexes guides with no proven demand', () => {
    expect(isToolBlogIndexable('alabama-paycheck-calculator')).toBe(false);
    expect(isToolBlogIndexable('word-counter')).toBe(false);
  });

  it('leaves the overwhelming majority of guides noindexed', () => {
    const indexable = allToolBlogs.filter((b) => isToolBlogIndexable(b.slug));
    expect(indexable).toHaveLength(KEEPERS.length);
    expect(allToolBlogs.length).toBeGreaterThan(200);
  });
});
