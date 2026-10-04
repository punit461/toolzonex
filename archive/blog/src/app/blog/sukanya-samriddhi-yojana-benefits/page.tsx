import type { Metadata } from "next";
import SsyBenefits from "../../../components/pages/blogs/SsyBenefits";
import { AUTHOR_PERSON_SCHEMA, ORGANIZATION_SAME_AS } from "../../../data/author";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "Sukanya Samriddhi Yojana Benefits Explained",
  description: "A detailed look at the SSY scheme for the girl child. Learn about SSY benefits, interest rates, tax advantages, and how to open an account for your daughter.",
  keywords: ["Sukanya Samriddhi Yojana", "SSY benefits", "SSY scheme", "girl child scheme", "SSY interest rate", "Sukanya Samriddhi account", "daughter investment"],
  alternates: { canonical: "/blog/sukanya-samriddhi-yojana-benefits" },
  openGraph: {
    title: "Sukanya Samriddhi Yojana Benefits - Complete Guide | ToolZoneX",
    description: "A detailed look at the SSY scheme for the girl child.",
    url: `${SITE_URL}/blog/sukanya-samriddhi-yojana-benefits`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sukanya Samriddhi Yojana Benefits - Complete Guide | ToolZoneX",
    description: "A detailed look at the SSY scheme for the girl child.",
    images: [`${SITE_URL}/og-image.jpg`],
    creator: "@toolzonex",
  },
};

const ssyBenefitsSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Sukanya Samriddhi Yojana Benefits - Complete Guide for Parents",
  "description": "A detailed look at the SSY scheme for the girl child.",
  "url": `${SITE_URL}/blog/sukanya-samriddhi-yojana-benefits`,
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ssyBenefitsSchema) }}
      />
      <SsyBenefits />
    </>
  );
}
