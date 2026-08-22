import type { Metadata } from "next";
import CharacterDistributionAnalyzer from "../../../calculators/CharacterDistributionAnalyzer";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "Character Distribution Analyzer - Letter Frequency Counter",
  description: "Analyze the exact frequency and distribution of every character in your text. Free online character counting and letter frequency tool.",
  keywords: ["character distribution analyzer", "letter frequency counter", "character count tool", "text frequency analysis", "letter statistics", "letter frequency online"],
  alternates: { canonical: "/text-tools/character-distribution-analyzer" },
  openGraph: {
    title: "Character Distribution Analyzer - Letter Frequency Counter | ToolZoneX",
    description: "Analyze the exact frequency and distribution of every character in your text.",
    url: `${SITE_URL}/text-tools/character-distribution-analyzer`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Character Distribution Analyzer",
  "description": "Analyze the exact frequency and distribution of every character in your text.",
  "url": `${SITE_URL}/text-tools/character-distribution-analyzer`,
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
      "name": "Can I check letter frequency online with this tool?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes — paste your text and every letter, digit, space, and punctuation mark is broken out in the results table with its count and percentage, so you can check letter frequency online without downloading any software." }
    },
    {
      "@type": "Question",
      "name": "Is the analysis case-sensitive?",
      "acceptedAnswer": { "@type": "Answer", "text": "Uppercase and lowercase versions of the same letter are typically counted separately, reflecting the exact characters as typed." }
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
      <CharacterDistributionAnalyzer />
    </>
  );
}
