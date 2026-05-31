import type { Metadata } from "next";
import TextSplitter from "../../../calculators/TextSplitter";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://punit461.github.io/toolzonex';

export const metadata: Metadata = {
  title: "Text Splitter - Split Text by Lines, Chars, or Delimiters",
  description: "Split text by characters, lines, or delimiters. Break large texts into smaller chunks online for free. Ideal for Twitter threads or CSVs.",
  keywords: ["text splitter", "split text online", "break text into chunks", "split string by delimiter", "text chunker"],
  alternates: { canonical: "/tools/text-splitter" },
  openGraph: {
    title: "Text Splitter - Split Text by Lines, Chars, or Delimiters | ToolZoneX",
    description: "Split text by characters, lines, or delimiters. Break large texts into smaller chunks online.",
    url: `${SITE_URL}/tools/text-splitter`,
    type: "article",
  },
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Text Splitter",
  "description": "Split text by characters, lines, or delimiters.",
  "url": `${SITE_URL}/tools/text-splitter`,
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
