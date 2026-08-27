import type { Metadata } from 'next';
import type { ToolRegistryEntry } from '../data/toolRegistry';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

/** Builds a tool page.tsx's `export const metadata` from its registry entry. */
export function buildToolMetadata(tool: ToolRegistryEntry): Metadata {
  return {
    title: tool.seoTitle,
    description: tool.seoDescription,
    keywords: tool.keywords,
    alternates: { canonical: tool.route },
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
