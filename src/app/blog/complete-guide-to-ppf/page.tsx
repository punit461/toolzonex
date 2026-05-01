import type { Metadata } from "next";
import PpfGuide from "../../../pages/blogs/PpfGuide";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://punit461.github.io/toolzonex';

export const metadata: Metadata = {
  title: "Complete Guide to PPF - Public Provident Fund Investment",
  description: "Everything you need to know about investing in the Public Provident Fund. Learn about PPF interest rates, maturity, tax benefits, and investment strategies.",
  keywords: ["PPF guide", "Public Provident Fund", "PPF investment", "PPF interest rate", "PPF tax benefit", "PPF account", "government savings scheme"],
  alternates: { canonical: "/blog/complete-guide-to-ppf" },
  openGraph: {
    title: "Complete Guide to PPF - Public Provident Fund | ToolZoneX",
    description: "Everything you need to know about investing in the Public Provident Fund.",
    url: `${SITE_URL}/blog/complete-guide-to-ppf`,
    type: "article",
  },
};

const ppfGuideSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Complete Guide to PPF - Public Provident Fund Investment",
  "description": "Everything you need to know about investing in the Public Provident Fund.",
  "url": `${SITE_URL}/blog/complete-guide-to-ppf`,
  "datePublished": "2025-01-10",
  "dateModified": "2025-01-10",
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ppfGuideSchema) }}
      />
      <PpfGuide />
    </>
  );
}
