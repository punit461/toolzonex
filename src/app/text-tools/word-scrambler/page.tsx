import type { Metadata } from "next";
import WordScrambler from "../../../calculators/WordScrambler";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "Word Scrambler - Scramble Letters in Text Online",
  description: "Scramble the letters in words or text while keeping first and last letters intact. Free online word scrambler tool.",
  keywords: ["word scrambler","letter scrambler","scramble text","jumble words","text scrambler online","text scrambler","scramblinator"],
  alternates: { canonical: "/text-tools/word-scrambler" },
  openGraph: {
    title: "Word Scrambler - Scramble Letters in Text Online | ToolZoneX",
    description: "Scramble the letters in words or text while keeping first and last letters intact. Free online word scrambler tool.",
    url: `${SITE_URL}/text-tools/word-scrambler`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "WordScrambler",
  "description": "Scramble the letters in words or text while keeping first and last letters intact. Free online word scrambler tool.",
  "url": `${SITE_URL}/text-tools/word-scrambler`,
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
      "name": "Is this the same as a text scrambler or \"scramblinator\"?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes — this tool is a text scrambler (sometimes searched as a \"scramblinator\") that jumbles the letters in each word while leaving spacing and word order untouched." }
    },
    {
      "@type": "Question",
      "name": "Why are short words left unchanged?",
      "acceptedAnswer": { "@type": "Answer", "text": "Words under 4 letters don't have enough middle letters to scramble meaningfully." }
    },
    {
      "@type": "Question",
      "name": "Is the scramble the same every time?",
      "acceptedAnswer": { "@type": "Answer", "text": "No, each click produces a new random shuffle." }
    },
    {
      "@type": "Question",
      "name": "Is my text uploaded anywhere?",
      "acceptedAnswer": { "@type": "Answer", "text": "No — scrambling happens entirely in your browser." }
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
      <WordScrambler />
    </>
  );
}
