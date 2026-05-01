import type { Metadata } from "next";
import CompoundInterest from "../../../pages/blogs/CompoundInterest";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://punit461.github.io/toolzonex';

export const metadata: Metadata = {
  title: "The Power of Compound Interest - How Compounding Creates Wealth",
  description: "Learn how compounding works and why starting early is the key to wealth generation. Discover the magic of compound interest for your investments.",
  keywords: ["compound interest", "power of compounding", "wealth creation", "investment returns", "compound growth", "SIP returns", "long term investing"],
  alternates: { canonical: "/blog/power-of-compound-interest" },
  openGraph: {
    title: "The Power of Compound Interest | ToolZoneX",
    description: "How compounding works and why starting early is the key to wealth generation.",
    url: `${SITE_URL}/blog/power-of-compound-interest`,
    type: "article",
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
    "logo": { "@type": "ImageObject", "url": `${SITE_URL}/toolzonex/logo.png` }
  }
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(compoundInterestSchema) }}
      />
      <CompoundInterest />
    </>
  );
}
