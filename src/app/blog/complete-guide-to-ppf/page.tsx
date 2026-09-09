import type { Metadata } from "next";
import PpfGuide from "../../../components/pages/blogs/PpfGuide";
import { AUTHOR_PERSON_SCHEMA, ORGANIZATION_SAME_AS } from "../../../data/author";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "Complete Guide to PPF: Interest Rate, Rules & Benefits (2026)",
  description: "Everything you need to know about the Public Provident Fund: current interest rate, EEE tax benefits, investment limits, account-opening steps, and how it compares to ELSS, NSC, and FDs.",
  keywords: ["PPF guide", "Public Provident Fund", "PPF investment", "PPF interest rate", "PPF tax benefit", "PPF account", "government savings scheme", "PPF vs ELSS", "PPF vs NSC"],
  alternates: { canonical: "/blog/complete-guide-to-ppf" },
  openGraph: {
    title: "Complete Guide to PPF: Interest Rate, Rules & Benefits (2026) | ToolZoneX",
    description: "Current PPF interest rate, EEE tax benefits, account-opening steps, and a comparison to ELSS, NSC, and FDs.",
    url: `${SITE_URL}/blog/complete-guide-to-ppf`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Complete Guide to PPF: Interest Rate, Rules & Benefits (2026) | ToolZoneX",
    description: "Current PPF interest rate, EEE tax benefits, account-opening steps, and a comparison to ELSS, NSC, and FDs.",
    images: [`${SITE_URL}/og-image.jpg`],
    creator: "@toolzonex",
  },
};

const ppfGuideSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "The Complete Guide to PPF: Interest Rate, Rules, and Benefits (2026)",
  "description": "Everything you need to know about the Public Provident Fund: current interest rate, EEE tax benefits, investment limits, and how it compares to ELSS, NSC, and FDs.",
  "url": `${SITE_URL}/blog/complete-guide-to-ppf`,
  "image": [`${SITE_URL}/og-image.jpg`],
  "datePublished": "2026-05-01",
  "dateModified": "2026-09-08",
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ppfGuideSchema) }}
      />
      <PpfGuide />
    </>
  );
}
