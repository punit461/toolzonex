import type { Metadata } from "next";
import SentenceCaseFixer from "../../../calculators/SentenceCaseFixer";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "Sentence Case Fixer - Convert Text Case Online",
  description: "Convert text to UPPERCASE, lowercase, Title Case, or Sentence case instantly. Free online text formatting tool to fix caps lock errors.",
  keywords: ["sentence case", "convert text case", "uppercase to lowercase", "title case converter", "fix caps lock", "capitalize text"],
  alternates: { canonical: "/text-tools/sentence-case-fixer" },
  openGraph: {
    title: "Sentence Case Fixer - Convert Text Case Online | ToolZoneX",
    description: "Convert text to UPPERCASE, lowercase, Title Case, or Sentence case instantly. Free online text formatting tool.",
    url: `${SITE_URL}/text-tools/sentence-case-fixer`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Sentence Case Fixer",
  "description": "Convert text to UPPERCASE, lowercase, Title Case, or Sentence case instantly.",
  "url": `${SITE_URL}/text-tools/sentence-case-fixer`,
  "applicationCategory": "UtilityApplication",
  "operatingSystem": "Web Browser",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "INR" },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(toolSchema) }}
      />
      <SentenceCaseFixer />
    </>
  );
}
