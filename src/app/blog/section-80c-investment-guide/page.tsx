import type { Metadata } from "next";
import Section80CGuide from "../../../components/pages/blogs/Section80CGuide";
import { AUTHOR_PERSON_SCHEMA, ORGANIZATION_SAME_AS } from "../../../data/author";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

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
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Section 80C Investment Guide - Best Tax Saving Options | ToolZoneX",
    description: "Best investment options to save tax under Section 80C.",
    images: [`${SITE_URL}/og-image.jpg`],
    creator: "@toolzonex",
  },
};

const section80CSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Section 80C Investment Guide - Best Tax Saving Options",
  "description": "Best investment options to save tax under Section 80C.",
  "url": `${SITE_URL}/blog/section-80c-investment-guide`,
  "image": [`${SITE_URL}/og-image.jpg`],
  "datePublished": "2026-04-01",
  "dateModified": "2026-04-01",
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(section80CSchema) }}
      />
      <Section80CGuide />
    </>
  );
}
