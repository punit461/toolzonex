import type { Metadata } from "next";
import NumberToWordsConverter from "../../../calculators/NumberToWordsConverter";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "Number to Words Converter - Write Numbers in English",
  description: "Convert any number to English words instantly. Perfect for writing checks, legal documents, and large numbers.",
  keywords: ["number to words", "numbers to words converter", "how to spell number", "amount in words generator", "check writing number to words"],
  alternates: { canonical: "/utilities/number-to-words-converter" },
  openGraph: {
    title: "Number to Words Converter - Write Numbers in English | ToolZoneX",
    description: "Convert any number to English words instantly. Perfect for writing checks, legal documents, and large numbers.",
    url: `${SITE_URL}/utilities/number-to-words-converter`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Number to Words Converter",
  "description": "Convert any number to English words instantly.",
  "url": `${SITE_URL}/utilities/number-to-words-converter`,
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
      <NumberToWordsConverter />
    </>
  );
}
