import type { Metadata } from "next";
import TextStatsAnalyzer from "../../../calculators/TextStatsAnalyzer";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://punit461.github.io/toolzonex';

export const metadata: Metadata = {
  title: "Text Stats Analyzer - Readability & Character Metrics",
  description: "Advanced text analysis tool. Calculate readability grade levels, syllables, vowels, consonants, and average word length instantly online.",
  keywords: ["text stats analyzer", "text metrics", "calculate readability", "flesch kincaid online", "syllable counter", "vowel counter"],
  alternates: { canonical: "/tools/text-stats-analyzer" },
  openGraph: {
    title: "Text Stats Analyzer - Readability & Character Metrics | ToolZoneX",
    description: "Advanced text analysis tool. Calculate readability grade levels, syllables, vowels, consonants, and average word length.",
    url: `${SITE_URL}/tools/text-stats-analyzer`,
    type: "article",
  },
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Text Stats Analyzer",
  "description": "Advanced text analysis tool to calculate readability and other metrics.",
  "url": `${SITE_URL}/tools/text-stats-analyzer`,
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
