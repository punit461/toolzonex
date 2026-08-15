import type { Metadata } from "next";
import TextRepeater from "../../../calculators/TextRepeater";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "Text Repeater - Multiply Words and Phrases Online",
  description: "Repeat a word or phrase up to 100,000 times instantly. Free online text multiplier and string repeater tool.",
  keywords: ["text repeater", "repeat text online", "word multiplier", "string repeater", "repeat string 1000 times"],
  alternates: { canonical: "/text-tools/text-repeater" },
  openGraph: {
    title: "Text Repeater - Multiply Words and Phrases Online | ToolZoneX",
    description: "Repeat a word or phrase up to 100,000 times instantly. Free online text multiplier.",
    url: `${SITE_URL}/text-tools/text-repeater`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Text Repeater",
  "description": "Repeat a word or phrase up to 100,000 times instantly.",
  "url": `${SITE_URL}/text-tools/text-repeater`,
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
      <TextRepeater />
    </>
  );
}
