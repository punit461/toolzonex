import type { Metadata } from 'next';
import type { ToolRegistryEntry } from '../data/toolRegistry';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

/** The brand suffix the root layout's `template: "%s | ToolZoneX"` appends. */
const BRAND_SUFFIX = ' | ToolZoneX';

/**
 * Bing Webmaster's "title too long" threshold. Google truncates a little
 * earlier (~60 chars, though it measures pixels, not characters), so titles
 * landing in the 60-65 band are a deliberate compromise rather than ideal.
 */
const TITLE_LIMIT = 65;

/**
 * Lets the layout append " | ToolZoneX" only when the result still fits.
 *
 * A Bing site scan on 2026-09-14 flagged 57 of the 168 indexed pages for
 * over-length titles. None of them were badly written -- the suffix alone put
 * them over, and dropping it brings 166 of 167 branded titles back under the
 * limit without touching a single word of the copy.
 *
 * Returning a bare string opts into the layout template; returning
 * `{ absolute }` bypasses it. So the brand is kept wherever it fits and
 * dropped only where it would have caused a truncated SERP snippet.
 */
export function brandedTitle(title: string): string | { absolute: string } {
  return title.length + BRAND_SUFFIX.length <= TITLE_LIMIT
    ? title
    : { absolute: title };
}

/** Builds a tool page.tsx's `export const metadata` from its registry entry. */
export function buildToolMetadata(tool: ToolRegistryEntry): Metadata {
  return {
    title: brandedTitle(tool.seoTitle),
    description: tool.seoDescription,
    keywords: tool.keywords,
    alternates: { canonical: tool.route },
    // Pages flagged `noindex` stay live and usable; they're just withheld from
    // Google. `follow: true` keeps internal link equity flowing through them.
    // Omitted entirely when not flagged, so the layout's site-wide default applies.
    ...(tool.noindex ? { robots: { index: false, follow: true } } : {}),
    openGraph: {
      title: tool.ogTitle,
      description: tool.ogDescription,
      url: `${SITE_URL}${tool.route}`,
      type: 'article',
      images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: 'ToolZoneX' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: tool.ogTitle,
      description: tool.ogDescription,
      images: [`${SITE_URL}/og-image.jpg`],
      creator: '@toolzonex',
    },
  };
}

/** Builds a tool page's inline WebApplication JSON-LD schema from its registry entry. */
export function buildToolSchema(tool: ToolRegistryEntry): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: tool.schemaName,
    description: tool.schemaDescription,
    url: `${SITE_URL}${tool.route}`,
    applicationCategory: tool.applicationCategory,
    operatingSystem: 'Web Browser',
    offers: { '@type': 'Offer', price: '0', priceCurrency: tool.currency ?? 'INR' },
    ...tool.extraSchemaFields,
  };
}
