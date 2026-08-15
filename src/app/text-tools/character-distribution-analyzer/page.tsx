import type { Metadata } from "next";
import CharacterDistributionAnalyzer from "../../../calculators/CharacterDistributionAnalyzer";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "Character Distribution Analyzer - Letter Frequency Counter",
  description: "Analyze the exact frequency and distribution of every character in your text. Free online character counting and letter frequency tool.",
  keywords: ["character distribution analyzer", "letter frequency counter", "character count tool", "text frequency analysis", "letter statistics"],
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

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(toolSchema) }}
      />
      <CharacterDistributionAnalyzer />
    </>
  );
}
