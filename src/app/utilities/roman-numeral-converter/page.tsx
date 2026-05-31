import type { Metadata } from "next";
import RomanNumeralConverter from "../../../calculators/RomanNumeralConverter";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://punit461.github.io/toolzonex';

export const metadata: Metadata = {
  title: "Roman Numeral Converter - Numbers to Roman Numerals",
  description: "Convert numbers to Roman numerals and vice versa instantly. Free online roman numeral translator.",
  keywords: ["roman numeral converter", "numbers to roman numerals", "translate roman numerals", "roman numeral calculator"],
  alternates: { canonical: "/utilities/roman-numeral-converter" },
  openGraph: {
    title: "Roman Numeral Converter - Numbers to Roman Numerals | ToolZoneX",
    description: "Convert numbers to Roman numerals and vice versa instantly. Free online roman numeral translator.",
    url: `${SITE_URL}/utilities/roman-numeral-converter`,
    type: "article",
  },
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Roman Numeral Converter",
  "description": "Convert numbers to Roman numerals and vice versa instantly.",
  "url": `${SITE_URL}/utilities/roman-numeral-converter`,
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
      <RomanNumeralConverter />
    </>
  );
}
