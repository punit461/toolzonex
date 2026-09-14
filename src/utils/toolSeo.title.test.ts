import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import { brandedTitle } from './toolSeo';

/**
 * Guards the title-length fix from 2026-09-14, after a Bing site scan flagged
 * 57 of 168 indexed pages for over-length titles.
 */

const SUFFIX = ' | ToolZoneX';
const LIMIT = 65;

/** What the page actually renders once the layout template has been applied. */
function rendered(t: string): string {
  const r = brandedTitle(t);
  return typeof r === 'string' ? r + SUFFIX : r.absolute;
}

describe('brandedTitle', () => {
  it('keeps the brand suffix when the result still fits', () => {
    const short = 'BMI Calculator';
    expect(brandedTitle(short)).toBe(short);
    expect(rendered(short)).toBe('BMI Calculator | ToolZoneX');
  });

  it('drops the brand rather than overflowing', () => {
    const long = 'Self-Employment Tax Calculator - 1099 Freelance & Contractor';
    expect(brandedTitle(long)).toEqual({ absolute: long });
    expect(rendered(long)).toBe(long);
  });

  it('keeps the brand at exactly the limit', () => {
    const t = 'x'.repeat(LIMIT - SUFFIX.length);
    expect(rendered(t)).toHaveLength(LIMIT);
    expect(rendered(t).endsWith(SUFFIX)).toBe(true);
  });

  it('drops the brand one character past the limit', () => {
    const t = 'x'.repeat(LIMIT - SUFFIX.length + 1);
    expect(rendered(t)).toBe(t);
  });

  it('never truncates or otherwise rewrites the title text', () => {
    // The fix must only add or withhold the suffix -- silently trimming a
    // title would change keyword targeting without anyone noticing.
    for (const t of ['Short', 'y'.repeat(200)]) {
      expect(rendered(t).replace(SUFFIX, '')).toBe(t);
    }
  });
});

describe('registry seoTitles', () => {
  // Read the per-tool files as text rather than importing the registry: those
  // modules hold JSX icon elements, which this test runner can't parse.
  const dir = path.join(__dirname, '..', 'data', 'tools');
  const tools = fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.tsx'))
    .map((f) => {
      const src = fs.readFileSync(path.join(dir, f), 'utf8');
      return {
        file: f,
        seoTitle: src.match(/seoTitle:\s*"((?:[^"\\]|\\.)*)"/)?.[1],
        noindex: /noindex:\s*true/.test(src),
      };
    });

  it('parsed a plausible number of tools', () => {
    expect(tools.length).toBeGreaterThan(1000);
    expect(tools.filter((t) => !t.seoTitle)).toEqual([]);
  });

  it('every indexed tool renders a title within the limit', () => {
    const tooLong = tools
      .filter((t) => !t.noindex)
      .map((t) => ({ file: t.file, rendered: rendered(t.seoTitle!) }))
      .filter((r) => r.rendered.length > LIMIT);
    expect(tooLong).toEqual([]);
  });
});
