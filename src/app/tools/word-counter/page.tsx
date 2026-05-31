import type { Metadata } from "next";
import WordCounter from "../../../calculators/WordCounter";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://punit461.github.io/toolzonex';

export const metadata: Metadata = {
  title: "Word Counter - Count Words & Characters Online",
  description: "Count words, characters, sentences, and paragraphs in real-time. Free online word count tool for writers, SEO, and students.",
  keywords: ["word counter", "character counter", "count words", "count characters", "letter count", "text stats"],
  alternates: { canonical: "/tools/word-counter" },
  openGraph: {
    title: "Word Counter - Count Words & Characters Online | ToolZoneX",
    description: "Count words, characters, sentences, and paragraphs in real-time. Free online word count tool for writers, SEO, and students.",
    url: `${SITE_URL}/tools/word-counter`,
    type: "article",
  },
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Word Counter",
  "description": "Count words, characters, sentences, and paragraphs in real-time. Free online word count tool.",
  "url": `${SITE_URL}/tools/word-counter`,
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
