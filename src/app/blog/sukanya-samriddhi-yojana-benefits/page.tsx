import type { Metadata } from "next";
import SsyBenefits from "../../../pages/blogs/SsyBenefits";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://punit461.github.io/toolzonex';

export const metadata: Metadata = {
  title: "Sukanya Samriddhi Yojana Benefits - Complete Guide for Parents",
  description: "A detailed look at the SSY scheme for the girl child. Learn about SSY benefits, interest rates, tax advantages, and how to open an account for your daughter.",
  keywords: ["Sukanya Samriddhi Yojana", "SSY benefits", "SSY scheme", "girl child scheme", "SSY interest rate", "Sukanya Samriddhi account", "daughter investment"],
  alternates: { canonical: "/blog/sukanya-samriddhi-yojana-benefits" },
  openGraph: {
    title: "Sukanya Samriddhi Yojana Benefits - Complete Guide | ToolZoneX",
    description: "A detailed look at the SSY scheme for the girl child.",
    url: `${SITE_URL}/blog/sukanya-samriddhi-yojana-benefits`,
    type: "article",
  },
};

const ssyBenefitsSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Sukanya Samriddhi Yojana Benefits - Complete Guide for Parents",
  "description": "A detailed look at the SSY scheme for the girl child.",
  "url": `${SITE_URL}/blog/sukanya-samriddhi-yojana-benefits`,
  "datePublished": "2025-01-15",
  "dateModified": "2025-01-15",
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ssyBenefitsSchema) }}
      />
      <SsyBenefits />
    </>
  );
}
