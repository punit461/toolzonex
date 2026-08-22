import type { Metadata } from "next";
import WhitespaceCleaner from "../../../calculators/WhitespaceCleaner";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "Whitespace Cleaner - Remove Extra Spaces & Empty Lines",
  description: "Remove extra spaces, tabs, and empty lines from text automatically. Free online text formatting tool to clean up messy data.",
  keywords: ["whitespace cleaner", "remove extra spaces", "trim text", "remove empty lines", "clean text format", "remove tabs", "get rid of spaces"],
  alternates: { canonical: "/text-tools/whitespace-cleaner" },
  openGraph: {
    title: "Whitespace Cleaner - Remove Extra Spaces & Empty Lines | ToolZoneX",
    description: "Remove extra spaces, tabs, and empty lines from text automatically. Free online text formatting tool.",
    url: `${SITE_URL}/text-tools/whitespace-cleaner`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Whitespace Cleaner",
  "description": "Remove extra spaces, tabs, and empty lines from text automatically.",
  "url": `${SITE_URL}/text-tools/whitespace-cleaner`,
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
      "name": "How do I get rid of spaces in my text?",
      "acceptedAnswer": { "@type": "Answer", "text": "Paste your text in, tick \"Remove multiple spaces between words\" and \"Trim spaces at beginning and end of lines\", then click \"Clean Whitespace\" — that's the fastest way to get rid of spaces, double spaces, and stray tabs in one pass." }
    },
    {
      "@type": "Question",
      "name": "Does this remove line breaks entirely?",
      "acceptedAnswer": { "@type": "Answer", "text": "No — it removes extra blank lines and trailing whitespace while keeping your paragraph structure intact." }
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
      <WhitespaceCleaner />
    </>
  );
}
