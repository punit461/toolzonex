import type { Metadata } from "next";
import Rebate87A from "../../../pages/blogs/Rebate87A";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://punit461.github.io/toolzonex';

export const metadata: Metadata = {
  title: "Section 87A Rebate Guide - How to Pay Zero Income Tax",
  description: "How to claim zero tax using Section 87A rebate. Learn about income tax rebate eligibility, limits, and how to reduce your tax liability to zero.",
  keywords: ["Section 87A", "87A rebate", "zero tax", "tax rebate", "income tax rebate", "tax saving", "rebat 87A eligibility"],
  alternates: { canonical: "/blog/section-87a-rebate-guide" },
  openGraph: {
    title: "Section 87A Rebate Guide - How to Pay Zero Income Tax | ToolZoneX",
    description: "How to claim zero tax using Section 87A rebate.",
    url: `${SITE_URL}/blog/section-87a-rebate-guide`,
    type: "article",
  },
};

const section87ASchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Section 87A Rebate Guide - How to Pay Zero Income Tax",
  "description": "How to claim zero tax using Section 87A rebate.",
  "url": `${SITE_URL}/blog/section-87a-rebate-guide`,
  "datePublished": "2025-01-22",
  "dateModified": "2025-01-22",
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(section87ASchema) }}
      />
      <Rebate87A />
    </>
  );
}
