import type { Metadata } from "next";
import TextReverser from "../../../calculators/TextReverser";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://punit461.github.io/toolzonex';

export const metadata: Metadata = {
  title: "Text Reverser - Reverse Text, Words, and Lines Online",
  description: "Reverse text backwards, reverse words, or flip lines upside down. Free online text reversal tool to mirror your text instantly.",
  keywords: ["text reverser", "reverse text", "flip text", "mirror text", "reverse words", "backwards text generator"],
  alternates: { canonical: "/tools/text-reverser" },
  openGraph: {
    title: "Text Reverser - Reverse Text, Words, and Lines Online | ToolZoneX",
    description: "Reverse text backwards, reverse words, or flip lines upside down. Free online text reversal tool.",
    url: `${SITE_URL}/tools/text-reverser`,
    type: "article",
  },
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Text Reverser",
  "description": "Reverse text backwards, reverse words, or flip lines upside down. Free online text reversal tool.",
  "url": `${SITE_URL}/tools/text-reverser`,
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
      <TextReverser />
    </>
  );
}
