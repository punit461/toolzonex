import type { Metadata } from "next";
import CompoundInterest from "../../../components/pages/blogs/CompoundInterest";
import Breadcrumbs from "../../../components/Breadcrumbs";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "The Power of Compound Interest Explained",
  description: "Learn how compounding works and why starting early is the key to wealth generation. Discover the magic of compound interest for your investments.",
  keywords: ["compound interest", "power of compounding", "wealth creation", "investment returns", "compound growth", "SIP returns", "long term investing"],
  alternates: { canonical: "/blog/power-of-compound-interest" },
  openGraph: {
    title: "The Power of Compound Interest | ToolZoneX",
    description: "How compounding works and why starting early is the key to wealth generation.",
    url: `${SITE_URL}/blog/power-of-compound-interest`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Power of Compound Interest | ToolZoneX",
    description: "How compounding works and why starting early is the key to wealth generation.",
    images: [`${SITE_URL}/og-image.jpg`],
    creator: "@toolzonex",
  },
};

const compoundInterestSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "The Power of Compound Interest - How Compounding Creates Wealth",
  "description": "Learn how compounding works and why starting early is the key to wealth generation.",
  "url": `${SITE_URL}/blog/power-of-compound-interest`,
  "datePublished": "2025-01-08",
  "dateModified": "2025-01-08",
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(compoundInterestSchema) }}
      />
      <Breadcrumbs items={[{ label: "Blog", href: "/blog" }, { label: "The Power of Compound Interest" }]} />
      <CompoundInterest />
    </>
  );
}
