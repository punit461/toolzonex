import type { Metadata } from "next";
import RomanNumeralConverter from "../../../calculators/utilities/RomanNumeralConverter";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "Roman Numeral Converter - Numbers to Roman Numerals & Back",
  description: "Convert numbers to Roman numerals, or translate Roman numerals back to regular numbers, instantly. Free bi-directional roman numeral converter and translator.",
  keywords: [
    "roman numeral converter",
    "numbers to roman numerals",
    "translate roman numerals",
    "roman numeral calculator",
    "convert to roman numerals",
    "convert to roman",
    "number to roman converter",
    "calculator for roman numerals",
    "convert roman to english",
    "translate roman numerals to english",
    "roman number to english number",
    "change number to roman numerals",
    "translate into roman numerals",
    "numbers to roman",
    "roman numbers translate",
    "numbers to roman letters",
    "roman numeral to number",
    "roman numerals to numbers converter",
  ],
  alternates: { canonical: "/utilities/roman-numeral-converter" },
  openGraph: {
    title: "Roman Numeral Converter - Numbers to Roman Numerals & Back | ToolZoneX",
    description: "Convert numbers to Roman numerals, or translate Roman numerals back to regular numbers, instantly. Free bi-directional roman numeral converter and translator.",
    url: `${SITE_URL}/utilities/roman-numeral-converter`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Roman Numeral Converter",
  "description": "Convert numbers to Roman numerals, or translate Roman numerals back to regular numbers, instantly.",
  "url": `${SITE_URL}/utilities/roman-numeral-converter`,
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
      "name": "How do I convert a number to Roman numerals?",
      "acceptedAnswer": { "@type": "Answer", "text": "Type your number into the \"Number\" field (any whole number from 1 to 3999) and the Roman numeral translation appears immediately in the \"Roman Numeral\" field below — no extra steps or button presses needed." }
    },
    {
      "@type": "Question",
      "name": "Can I convert Roman numerals back to regular numbers with this tool?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes — this tool converts in both directions. Type the Roman numeral (like \"MCMXCIV\" or \"XIV\") into the \"Roman Numeral\" field and the regular (decimal) number appears instantly in the \"Number\" field — this is the same as translating Roman numerals to English or converting a Roman number to an English number." }
    },
    {
      "@type": "Question",
      "name": "What is the Roman numeral for 2024?",
      "acceptedAnswer": { "@type": "Answer", "text": "2024 in Roman numerals is \"MMXXIV\" (M + M + XX + IV = 1000 + 1000 + 20 + 4). You can enter any year into the Number field to see its Roman numeral equivalent the same way." }
    },
    {
      "@type": "Question",
      "name": "Why is there no number for zero in Roman numerals?",
      "acceptedAnswer": { "@type": "Answer", "text": "The classical Roman numeral system had no symbol for zero, which is why this converter supports whole numbers from 1 to 3999." }
    },
    {
      "@type": "Question",
      "name": "What's the largest number I can convert to Roman numerals?",
      "acceptedAnswer": { "@type": "Answer", "text": "This converter supports numbers up to 3999 (MMMCMXCIX), which is the practical limit of standard Roman numeral notation without adding special overline symbols for larger values." }
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
      <RomanNumeralConverter />
    </>
  );
}
