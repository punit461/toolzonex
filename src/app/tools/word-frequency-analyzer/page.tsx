import type { Metadata } from "next";
import WordFrequencyAnalyzer from "../../../calculators/WordFrequencyAnalyzer";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://punit461.github.io/toolzonex';

export const metadata: Metadata = {
  title: "Word Frequency Analyzer - Keyword Density Checker",
  description: "Find the most frequently used words in a text. Calculate keyword density and word counts instantly online.",
  keywords: ["word frequency analyzer", "keyword density checker", "word counter", "frequent words text analysis"],
  alternates: { canonical: "/tools/word-frequency-analyzer" },
  openGraph: {
    title: "Word Frequency Analyzer - Keyword Density Checker | ToolZoneX",
    description: "Find the most frequently used words in a text. Calculate keyword density and word counts instantly online.",
    url: `${SITE_URL}/tools/word-frequency-analyzer`,
    type: "article",
  },
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Word Frequency Analyzer",
  "description": "Find the most frequently used words in a text. Calculate keyword density and word counts instantly online.",
  "url": `${SITE_URL}/tools/word-frequency-analyzer`,
  "applicationCategory": "EducationalApplication",
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
      <WordFrequencyAnalyzer />
    </>
  );
}
