import type { Metadata } from "next";
import DuplicateWordFinder from "../../../calculators/DuplicateWordFinder";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "Duplicate Word Finder - Find Repeated Words Online",
  description: "Find repeated words in your text to improve your writing and vocabulary. Free online duplicate word checker and frequency counter.",
  keywords: ["duplicate word finder", "find repeated words", "word frequency counter", "overused words checker", "writing improvement tool"],
  alternates: { canonical: "/text-tools/duplicate-word-finder" },
  openGraph: {
    title: "Duplicate Word Finder - Find Repeated Words Online | ToolZoneX",
    description: "Find repeated words in your text to improve your writing and vocabulary. Free online duplicate word checker.",
    url: `${SITE_URL}/text-tools/duplicate-word-finder`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Duplicate Word Finder",
  "description": "Find repeated words in your text to improve your writing and vocabulary.",
  "url": `${SITE_URL}/text-tools/duplicate-word-finder`,
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
      <DuplicateWordFinder />
    </>
  );
}
