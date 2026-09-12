import { describe, it, expect } from 'vitest';
import { buildToolMetadata } from './toolSeo';
import type { ToolRegistryEntry } from '../data/toolRegistryTypes';

/**
 * Guards the noindex mechanism added 2026-09-12 during the post-collapse
 * index cleanup. The risk this covers is asymmetric: wrongly emitting
 * noindex on a page we meant to keep is far more damaging than failing to
 * emit it, so both directions are asserted explicitly.
 */

const base: ToolRegistryEntry = {
  route: '/finance/example-calculator',
  navName: 'Example',
  navDescription: 'Example nav description.',
  name: 'Example Calculator',
  description: 'Example description.',
  navCategory: 'Finance',
  shellCategory: 'Finance',
  icon: null,
  seoTitle: 'Example Calculator',
  seoDescription: 'Example SEO description.',
  keywords: ['example'],
  ogTitle: 'Example Calculator | ToolZoneX',
  ogDescription: 'Example OG description.',
  schemaName: 'Example Calculator',
  schemaDescription: 'Example schema description.',
  applicationCategory: 'FinanceApplication',
  isHub: false,
} as unknown as ToolRegistryEntry;

describe('buildToolMetadata robots handling', () => {
  it('omits robots entirely when noindex is not set, so the layout default applies', () => {
    expect(buildToolMetadata(base).robots).toBeUndefined();
  });

  it('omits robots when noindex is explicitly false', () => {
    expect(buildToolMetadata({ ...base, noindex: false }).robots).toBeUndefined();
  });

  it('emits noindex + follow when the flag is set', () => {
    expect(buildToolMetadata({ ...base, noindex: true }).robots).toEqual({
      index: false,
      follow: true,
    });
  });

  it('keeps the canonical pointing at the page itself even when noindexed', () => {
    // A noindexed page must not lose or redirect its canonical: the page stays
    // live, and we want to flip it back to indexed later without another edit.
    const meta = buildToolMetadata({ ...base, noindex: true });
    expect(meta.alternates?.canonical).toBe('/finance/example-calculator');
  });
});
