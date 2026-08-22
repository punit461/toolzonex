import type { Metadata } from "next";
import SentenceCaseFixer from "../../../calculators/text-tools/SentenceCaseFixer";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "Sentence Case Fixer - Convert Text Case Online",
  description: "Convert text to UPPERCASE, lowercase, Title Case, or Sentence case instantly. Free online text formatting tool to fix caps lock errors.",
  keywords: ["sentence case", "convert text case", "uppercase to lowercase", "title case converter", "fix caps lock", "capitalize text", "caps fix"],
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

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How do I do a quick caps fix on my text?",
      "acceptedAnswer": { "@type": "Answer", "text": "Paste the text, pick \"Sentence case\", \"lower case\", or \"UPPER CASE\" from the Case Mode dropdown, and click \"Convert Text\" — a one-click caps fix for text typed with Caps Lock stuck on or pasted from an all-caps source." }
    },
    {
      "@type": "Question",
      "name": "Will this fix grammar or spelling too?",
      "acceptedAnswer": { "@type": "Answer", "text": "No — this tool only changes letter casing; it does not correct spelling, grammar, or punctuation." }
    }
  ]
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(toolSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <SentenceCaseFixer />
    </>
  );
}
