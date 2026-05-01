import type { Metadata } from "next";
import Section80CGuide from "../../../pages/blogs/Section80CGuide";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://punit461.github.io/toolzonex';

export const metadata: Metadata = {
  title: "Section 80C Investment Guide - Best Tax Saving Options",
  description: "Best investment options to save tax under Section 80C. Explore PPF, ELSS, NSC, life insurance, and other 80C investments for maximum tax benefit.",
  keywords: ["Section 80C", "80C investments", "tax saving", "ELSS funds", "PPF", "NSC", "tax deduction 80C", "tax saving investments"],
  alternates: { canonical: "/blog/section-80c-investment-guide" },
  openGraph: {
    title: "Section 80C Investment Guide - Best Tax Saving Options | ToolZoneX",
    description: "Best investment options to save tax under Section 80C.",
    url: `${SITE_URL}/blog/section-80c-investment-guide`,
    type: "article",
  },
};

const section80CSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Section 80C Investment Guide - Best Tax Saving Options",
  "description": "Best investment options to save tax under Section 80C.",
  "url": `${SITE_URL}/blog/section-80c-investment-guide`,
  "datePublished": "2025-01-18",
  "dateModified": "2025-01-18",
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(section80CSchema) }}
      />
      <Section80CGuide />
    </>
  );
}
