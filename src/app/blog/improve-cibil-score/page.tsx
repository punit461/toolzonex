import type { Metadata } from "next";
import ImproveCibilScore from "../../../components/pages/blogs/ImproveCibilScore";
import Breadcrumbs from "../../../components/Breadcrumbs";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "How to Improve Your CIBIL Score - Practical Tips",
  description: "Practical steps to boost your CIBIL score fast. Learn what affects your credit score and proven strategies to improve it for better loan approvals.",
  keywords: ["CIBIL score", "improve CIBIL", "credit score", "CIBIL improvement tips", "credit score boost", "loan approval", "credit report"],
  alternates: { canonical: "/blog/improve-cibil-score" },
  openGraph: {
    title: "How to Improve Your CIBIL Score | ToolZoneX",
    description: "Practical steps to boost your credit score fast.",
    url: `${SITE_URL}/blog/improve-cibil-score`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "How to Improve Your CIBIL Score | ToolZoneX",
    description: "Practical steps to boost your credit score fast.",
    images: [`${SITE_URL}/og-image.jpg`],
    creator: "@toolzonex",
  },
};

const cibilScoreSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "How to Improve Your CIBIL Score - Practical Tips for Better Credit",
  "description": "Practical steps to boost your CIBIL score fast.",
  "url": `${SITE_URL}/blog/improve-cibil-score`,
  "datePublished": "2025-01-25",
  "dateModified": "2025-01-25",
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(cibilScoreSchema) }}
      />
      <Breadcrumbs items={[{ label: "Blog", href: "/blog" }, { label: "How to Improve Your CIBIL Score" }]} />
      <ImproveCibilScore />
    </>
  );
}
