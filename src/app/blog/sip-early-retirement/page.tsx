import type { Metadata } from "next";
import SipRetirement from "../../../pages/blogs/SipRetirement";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://punit461.github.io/toolzonex';

export const metadata: Metadata = {
  title: "How to Use SIP for Early Retirement - FIRE Guide for India",
  description: "Learn how to leverage Systematic Investment Plans (SIP) to achieve financial independence and retire early. Complete guide to FIRE (Financial Independence, Retire Early).",
  keywords: ["SIP early retirement", "FIRE India", "financial independence", "retire early", "SIP returns", "mutual fund retirement", "FIRE movement"],
  alternates: { canonical: "/blog/sip-early-retirement" },
  openGraph: {
    title: "How to Use SIP for Early Retirement | ToolZoneX",
    description: "Learn how to leverage SIPs to achieve financial independence and retire early.",
    url: `${SITE_URL}/blog/sip-early-retirement`,
    type: "article",
  },
};

const sipRetirementSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "How to Use SIP for Early Retirement - FIRE Guide for India",
  "description": "Learn how to leverage Systematic Investment Plans (SIP) to achieve financial independence and retire early.",
  "url": `${SITE_URL}/blog/sip-early-retirement`,
  "datePublished": "2025-01-28",
  "dateModified": "2025-01-28",
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(sipRetirementSchema) }}
      />
      <SipRetirement />
    </>
  );
}
