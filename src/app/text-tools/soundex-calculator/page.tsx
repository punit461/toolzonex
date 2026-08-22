import type { Metadata } from "next";
import SoundexCalculator from "../../../calculators/SoundexCalculator";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "Soundex Calculator - Free Phonetic Code Generator",
  description: "Free online Soundex calculator. Generate the Soundex phonetic code for any word or name and instantly compare codes for similar-sounding names.",
  keywords: ["soundex calculator", "soundex algorithm", "phonetic code generator", "name matching algorithm", "soundex code", "phonetic algorithm", "soundex generator", "name soundex lookup", "genealogy name search"],
  alternates: { canonical: "/text-tools/soundex-calculator" },
  openGraph: {
    title: "Soundex Calculator - Free Phonetic Code Generator | ToolZoneX",
    description: "Generate the Soundex phonetic code for any word or name — free online Soundex algorithm calculator.",
    url: `${SITE_URL}/text-tools/soundex-calculator`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
};

const soundexCalculatorSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Soundex Calculator",
  "description": "Generate the Soundex phonetic code for any word or name using the standard American Soundex algorithm.",
  "url": `${SITE_URL}/text-tools/soundex-calculator`,
  "applicationCategory": "UtilityApplication",
  "operatingSystem": "Web Browser",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is Soundex?",
      "acceptedAnswer": { "@type": "Answer", "text": "Soundex is a phonetic algorithm that converts a word — typically a name — into a 4-character code (one letter plus three digits) representing how it sounds, so that similar-sounding words share the same code regardless of small spelling differences." }
    },
    {
      "@type": "Question",
      "name": "Why do two different spellings get the same code?",
      "acceptedAnswer": { "@type": "Answer", "text": "Soundex groups consonants that sound alike (like B, F, P, V) into the same digit and ignores vowels entirely, since vowels vary the most between alternate spellings of the same name. Two names that sound similar, such as \"Smith\" and \"Smyth\" or \"Robert\" and \"Rupert\", follow the same consonant pattern and so end up with the same code even though they're spelled differently." }
    },
    {
      "@type": "Question",
      "name": "Is Soundex case-sensitive?",
      "acceptedAnswer": { "@type": "Answer", "text": "No. Soundex first converts the input to uppercase, so \"robert\", \"Robert\", and \"ROBERT\" all produce the identical code, R163." }
    },
    {
      "@type": "Question",
      "name": "Does Soundex work for non-English names?",
      "acceptedAnswer": { "@type": "Answer", "text": "Soundex was designed around English-language pronunciation and spelling patterns, so it works best on names common in English-speaking records. It can still be applied to non-English names since it only looks at Latin letters, but the codes it produces may not reflect how those names actually sound in their original language." }
    }
  ]
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(soundexCalculatorSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <SoundexCalculator />
    </>
  );
}
