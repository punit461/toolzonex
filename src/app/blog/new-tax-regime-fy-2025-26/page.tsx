import type { Metadata } from "next";
import NewRegime2025 from "../../../components/pages/blogs/NewRegime2025";
import Breadcrumbs from "../../../components/Breadcrumbs";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "New Tax Regime FY 2025-26 - Latest Changes and Tax Slabs",
  description: "Latest changes and slabs in the new tax regime for FY 2025-26. Understand the updated tax brackets, standard deduction, and rebate limits under new regime.",
  keywords: ["new tax regime 2025-26", "tax slabs 2025", "new tax regime changes", "budget 2025 tax", "Section 115BAC", "new tax slabs India"],
  alternates: { canonical: "/blog/new-tax-regime-fy-2025-26" },
  openGraph: {
    title: "New Tax Regime FY 2025-26 - Latest Changes | ToolZoneX",
    description: "Latest changes and slabs in the new tax regime for FY 2025-26.",
    url: `${SITE_URL}/blog/new-tax-regime-fy-2025-26`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "New Tax Regime FY 2025-26 - Latest Changes | ToolZoneX",
    description: "Latest changes and slabs in the new tax regime for FY 2025-26.",
    images: [`${SITE_URL}/og-image.jpg`],
    creator: "@toolzonex",
  },
};

const newTaxRegimeSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "New Tax Regime FY 2025-26 - Latest Changes and Tax Slabs",
  "description": "Latest changes and slabs in the new tax regime for FY 2025-26.",
  "url": `${SITE_URL}/blog/new-tax-regime-fy-2025-26`,
  "datePublished": "2025-02-01",
  "dateModified": "2025-02-01",
  "author": { "@type": "Organization", "name": "ToolZoneX" },
  "publisher": {
    "@type": "Organization",
    "name": "ToolZoneX",
    "logo": { "@type": "ImageObject", "url": `${SITE_URL}/logo.png` }
  }
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(newTaxRegimeSchema) }}
      />
      <Breadcrumbs items={[{ label: "Blog", href: "/blog" }, { label: "New Tax Regime FY 2025-26" }]} />
      <NewRegime2025 />
    </>
  );
}
