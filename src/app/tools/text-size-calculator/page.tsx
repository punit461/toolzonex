import type { Metadata } from "next";
import TextSizeCalculator from "../../../calculators/TextSizeCalculator";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://punit461.github.io/toolzonex';

export const metadata: Metadata = {
  title: "Text Size Calculator - Analyze Text Statistics",
  description: "Analyze text with character count, word count, reading time, and more. Free online text size calculator for content analysis.",
  keywords: ["text size calculator", "text analyzer", "character count", "word count", "reading time calculator", "text statistics", "content analysis", "text metrics"],
  alternates: { canonical: "/tools/text-size-calculator" },
  openGraph: {
    title: "Text Size Calculator - Analyze Text Statistics | ToolZoneX",
    description: "Analyze text with character count, word count, reading time, and more. Free online text size calculator for content analysis.",
    url: `${SITE_URL}/tools/text-size-calculator`,
    type: "article",
  },
};

const textSizeCalculatorSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Text Size Calculator",
  "description": "Analyze text with character count, word count, reading time, and more. Free online text size calculator for content analysis.",
  "url": `${SITE_URL}/tools/text-size-calculator`,
  "applicationCategory": "UtilityApplication",
  "operatingSystem": "Web Browser",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "INR" },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(textSizeCalculatorSchema) }}
      />
      <TextSizeCalculator />
    </>
  );
}