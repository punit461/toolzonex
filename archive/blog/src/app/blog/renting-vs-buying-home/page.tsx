import type { Metadata } from "next";
import RentingVsBuying from "../../../components/pages/blogs/RentingVsBuying";
import { AUTHOR_PERSON_SCHEMA, ORGANIZATION_SAME_AS } from "../../../data/author";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "Renting vs Buying a Home - Which Is Right for You?",
  description: "Financial analysis to help you decide between renting and buying real estate. Compare costs, benefits, and long-term financial impact of each option.",
  keywords: ["rent vs buy", "renting vs buying home", "real estate decision", "property investment", "home loan vs rent", "property comparison"],
  alternates: { canonical: "/blog/renting-vs-buying-home" },
  openGraph: {
    title: "Renting vs Buying a Home - Financial Analysis | ToolZoneX",
    description: "Financial analysis to help you decide between renting and buying real estate.",
    url: `${SITE_URL}/blog/renting-vs-buying-home`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Renting vs Buying a Home - Financial Analysis | ToolZoneX",
    description: "Financial analysis to help you decide between renting and buying real estate.",
    images: [`${SITE_URL}/og-image.jpg`],
    creator: "@toolzonex",
  },
};

const rentingVsBuyingSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Renting vs Buying a Home - Financial Analysis for Property Decisions",
  "description": "Financial analysis to help you decide between renting and buying real estate.",
  "url": `${SITE_URL}/blog/renting-vs-buying-home`,
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(rentingVsBuyingSchema) }}
      />
      <RentingVsBuying />
    </>
  );
}
