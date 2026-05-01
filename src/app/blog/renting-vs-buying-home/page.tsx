import type { Metadata } from "next";
import RentingVsBuying from "../../../pages/blogs/RentingVsBuying";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://punit461.github.io/toolzonex';

export const metadata: Metadata = {
  title: "Renting vs Buying a Home - Financial Analysis for Property Decisions",
  description: "Financial analysis to help you decide between renting and buying real estate. Compare costs, benefits, and long-term financial impact of each option.",
  keywords: ["rent vs buy", "renting vs buying home", "real estate decision", "property investment", "home loan vs rent", "property comparison"],
  alternates: { canonical: "/blog/renting-vs-buying-home" },
  openGraph: {
    title: "Renting vs Buying a Home - Financial Analysis | ToolZoneX",
    description: "Financial analysis to help you decide between renting and buying real estate.",
    url: `${SITE_URL}/blog/renting-vs-buying-home`,
    type: "article",
  },
};

const rentingVsBuyingSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Renting vs Buying a Home - Financial Analysis for Property Decisions",
  "description": "Financial analysis to help you decide between renting and buying real estate.",
  "url": `${SITE_URL}/blog/renting-vs-buying-home`,
  "datePublished": "2025-01-12",
  "dateModified": "2025-01-12",
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(rentingVsBuyingSchema) }}
      />
      <RentingVsBuying />
    </>
  );
}
