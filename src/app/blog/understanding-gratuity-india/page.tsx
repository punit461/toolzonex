import type { Metadata } from "next";
import UnderstandingGratuity from "../../../components/pages/blogs/UnderstandingGratuity";
import Breadcrumbs from "../../../components/Breadcrumbs";

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
  "datePublished": "2025-01-30",
  "dateModified": "2025-01-30",
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(gratuitySchema) }}
      />
      <Breadcrumbs items={[{ label: "Blog", href: "/blog" }, { label: "Understanding Gratuity in India" }]} />
      <UnderstandingGratuity />
    </>
  );
}
