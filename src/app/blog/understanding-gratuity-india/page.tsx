import type { Metadata } from "next";
import UnderstandingGratuity from "../../../pages/blogs/UnderstandingGratuity";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://punit461.github.io/toolzonex';

export const metadata: Metadata = {
  title: "Understanding Gratuity in India - Rules, Eligibility & Tax Benefits",
  description: "Complete guide to gratuity in India: rules, eligibility, calculation, and tax exemptions. Understand your end-of-service gratuity benefits as an employee.",
  keywords: ["gratuity India", "gratuity rules", "gratuity eligibility", "gratuity tax exemption", "gratuity calculation", "employee benefits", "gratuity act"],
  alternates: { canonical: "/blog/understanding-gratuity-india" },
  openGraph: {
    title: "Understanding Gratuity in India | ToolZoneX",
    description: "Rules, eligibility, and tax exemptions for Gratuity in India.",
    url: `${SITE_URL}/blog/understanding-gratuity-india`,
    type: "article",
  },
};

const gratuitySchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Understanding Gratuity in India - Rules, Eligibility & Tax Benefits",
  "description": "Rules, eligibility, and tax exemptions for Gratuity in India.",
  "url": `${SITE_URL}/blog/understanding-gratuity-india`,
  "datePublished": "2025-01-30",
  "dateModified": "2025-01-30",
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(gratuitySchema) }}
      />
      <UnderstandingGratuity />
    </>
  );
}
