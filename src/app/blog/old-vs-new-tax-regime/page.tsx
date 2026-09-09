import type { Metadata } from "next";
import OldVsNewTax from "../../../components/pages/blogs/OldVsNewTax";
import { AUTHOR_PERSON_SCHEMA, ORGANIZATION_SAME_AS } from "../../../data/author";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "Old vs New Tax Regime FY 2025-26: Full Slab Comparison",
  description: "Complete old vs new tax regime comparison for FY 2025-26 with full slab-rate tables, standard deduction figures, Section 87A rebate thresholds, and a quick-verdict heuristic.",
  keywords: ["old vs new tax regime", "tax regime comparison", "tax slabs fy 2025-26", "tax saving", "tax regime choice", "old tax regime benefits", "new tax regime vs old"],
  alternates: { canonical: "/blog/old-vs-new-tax-regime" },
  openGraph: {
    title: "Old vs New Tax Regime FY 2025-26: Full Slab Comparison | ToolZoneX",
    description: "Full slab-rate tables for both regimes, plus a quick-verdict heuristic to help you choose.",
    url: `${SITE_URL}/blog/old-vs-new-tax-regime`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Old vs New Tax Regime FY 2025-26: Full Slab Comparison | ToolZoneX",
    description: "Full slab-rate tables for both regimes, plus a quick-verdict heuristic to help you choose.",
    images: [`${SITE_URL}/og-image.jpg`],
    creator: "@toolzonex",
  },
};

const oldVsNewTaxSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Old vs. New Tax Regime: Which Should You Choose? (FY 2025-26)",
  "description": "Complete old vs new tax regime comparison for FY 2025-26 with full slab-rate tables and a quick-verdict heuristic.",
  "url": `${SITE_URL}/blog/old-vs-new-tax-regime`,
  "image": [`${SITE_URL}/og-image.jpg`],
  "datePublished": "2026-04-01",
  "dateModified": "2026-09-08",
  "author": AUTHOR_PERSON_SCHEMA,
  "publisher": {
    "@type": "Organization",
    "name": "ToolZoneX",
    "logo": { "@type": "ImageObject", "url": `${SITE_URL}/logo.png` },
    "sameAs": ORGANIZATION_SAME_AS
  }
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(oldVsNewTaxSchema) }}
      />
      <OldVsNewTax />
    </>
  );
}
