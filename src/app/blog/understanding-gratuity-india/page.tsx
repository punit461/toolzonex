import type { Metadata } from "next";
import UnderstandingGratuity from "../../../components/pages/blogs/UnderstandingGratuity";
import { AUTHOR_PERSON_SCHEMA, ORGANIZATION_SAME_AS } from "../../../data/author";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "Understanding Gratuity in India - Rules & Tax Benefits",
  description: "Complete guide to gratuity in India: rules, eligibility, calculation, and tax exemptions. Understand your end-of-service gratuity benefits as an employee.",
  keywords: ["gratuity India", "gratuity rules", "gratuity eligibility", "gratuity tax exemption", "gratuity calculation", "employee benefits", "gratuity act"],
  alternates: { canonical: "/blog/understanding-gratuity-india" },
  openGraph: {
    title: "Understanding Gratuity in India | ToolZoneX",
    description: "Rules, eligibility, and tax exemptions for Gratuity in India.",
    url: `${SITE_URL}/blog/understanding-gratuity-india`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Understanding Gratuity in India | ToolZoneX",
    description: "Rules, eligibility, and tax exemptions for Gratuity in India.",
    images: [`${SITE_URL}/og-image.jpg`],
    creator: "@toolzonex",
  },
};

const gratuitySchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Understanding Gratuity in India - Rules, Eligibility & Tax Benefits",
  "description": "Rules, eligibility, and tax exemptions for Gratuity in India.",
  "url": `${SITE_URL}/blog/understanding-gratuity-india`,
  "image": [`${SITE_URL}/og-image.jpg`],
  "datePublished": "2026-05-01",
  "dateModified": "2026-05-01",
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(gratuitySchema) }}
      />
      <UnderstandingGratuity />
    </>
  );
}
