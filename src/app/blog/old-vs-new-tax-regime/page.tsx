import type { Metadata } from "next";
import OldVsNewTax from "../../../pages/blogs/OldVsNewTax";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://punit461.github.io/toolzonex';

export const metadata: Metadata = {
  title: "Old vs New Tax Regime: Which is Better for You?",
  description: "A comprehensive comparison of old vs new tax regime to help you choose the best tax saving option. Compare deductions, slabs, and tax outgo under both regimes.",
  keywords: ["old vs new tax regime", "tax regime comparison", "tax saving", "tax regime choice", "old tax regime benefits", "new tax regime vs old"],
  alternates: { canonical: "/blog/old-vs-new-tax-regime" },
  openGraph: {
    title: "Old vs New Tax Regime: Which is Better? | ToolZoneX",
    description: "A comprehensive comparison to help you choose the best tax regime.",
    url: `${SITE_URL}/blog/old-vs-new-tax-regime`,
    type: "article",
  },
};

const oldVsNewTaxSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Old vs New Tax Regime: Which is Better for You?",
  "description": "A comprehensive comparison of old vs new tax regime to help you choose the best tax saving option.",
  "url": `${SITE_URL}/blog/old-vs-new-tax-regime`,
  "datePublished": "2025-01-05",
  "dateModified": "2025-01-05",
  "author": { "@type": "Organization", "name": "ToolZoneX" },
  "publisher": {
    "@type": "Organization",
    "name": "ToolZoneX",
    "logo": { "@type": "ImageObject", "url": `${SITE_URL}/toolzonex/logo.png` }
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
