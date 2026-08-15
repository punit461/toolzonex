import type { Metadata } from "next";
import WordScrambler from "../../../calculators/WordScrambler";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "Word Scrambler - Scramble Letters in Text Online",
  description: "Scramble the letters in words or text while keeping first and last letters intact. Free online word scrambler tool.",
  keywords: ["word scrambler","letter scrambler","scramble text","jumble words","text scrambler online"],
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

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(toolSchema) }}
      />
      <WordScrambler />
    </>
  );
}
