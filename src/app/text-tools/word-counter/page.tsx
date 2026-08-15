import type { Metadata } from "next";
import WordCounter from "../../../calculators/WordCounter";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "Word Counter - Count Words & Characters Online",
  description: "Count words, characters, sentences, and paragraphs in real-time. Free online word count tool for writers, SEO, and students.",
  keywords: ["word counter", "character counter", "count words", "count characters", "letter count", "text stats"],
  alternates: { canonical: "/text-tools/word-counter" },
  openGraph: {
    title: "Word Counter - Count Words & Characters Online | ToolZoneX",
    description: "Count words, characters, sentences, and paragraphs in real-time. Free online word count tool for writers, SEO, and students.",
    url: `${SITE_URL}/text-tools/word-counter`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Word Counter",
  "description": "Count words, characters, sentences, and paragraphs in real-time. Free online word count tool.",
  "url": `${SITE_URL}/text-tools/word-counter`,
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
      <WordCounter />
    </>
  );
}
