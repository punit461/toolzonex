import type { Metadata } from "next";
import TextStatsAnalyzer from "../../../calculators/TextStatsAnalyzer";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "Text Stats Analyzer - Character, Word & Syllable Counts",
  description: "Analyze text statistics including characters, words, syllables, vowels, consonants, and average word length instantly online.",
  keywords: ["text stats analyzer", "text metrics", "syllable counter", "vowel counter", "consonant counter", "average word length"],
  alternates: { canonical: "/text-tools/text-stats-analyzer" },
  openGraph: {
    title: "Text Stats Analyzer - Character, Word & Syllable Counts | ToolZoneX",
    description: "Analyze text statistics including characters, words, syllables, vowels, consonants, and average word length.",
    url: `${SITE_URL}/text-tools/text-stats-analyzer`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Text Stats Analyzer",
  "description": "Advanced text analysis tool for characters, words, syllables, vowels, consonants, and other metrics.",
  "url": `${SITE_URL}/text-tools/text-stats-analyzer`,
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
      <TextStatsAnalyzer />
    </>
  );
}
