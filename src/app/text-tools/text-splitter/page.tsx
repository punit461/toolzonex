import type { Metadata } from "next";
import TextSplitter from "../../../calculators/TextSplitter";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "Text Splitter - Split Text by Lines, Chars, or Delimiters",
  description: "Split text by characters, lines, or delimiters. Break large texts into smaller chunks online for free. Ideal for Twitter threads or CSVs.",
  keywords: ["text splitter", "split text online", "break text into chunks", "split string by delimiter", "text chunker"],
  alternates: { canonical: "/text-tools/text-splitter" },
  openGraph: {
    title: "Text Splitter - Split Text by Lines, Chars, or Delimiters | ToolZoneX",
    description: "Split text by characters, lines, or delimiters. Break large texts into smaller chunks online.",
    url: `${SITE_URL}/text-tools/text-splitter`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Text Splitter",
  "description": "Split text by characters, lines, or delimiters.",
  "url": `${SITE_URL}/text-tools/text-splitter`,
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
      <TextSplitter />
    </>
  );
}
