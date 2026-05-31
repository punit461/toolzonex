import type { Metadata } from "next";
import TextMerger from "../../../calculators/TextMerger";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://punit461.github.io/toolzonex';

export const metadata: Metadata = {
  title: "Text Merger - Combine Lists Line by Line",
  description: "Combine two lists of text line by line instantly. Perfect for merging columns of data.",
  keywords: ["text merger", "combine lists", "merge lines", "list concatenator", "combine two columns"],
  alternates: { canonical: "/tools/text-merger" },
  openGraph: {
    title: "Text Merger - Combine Lists Line by Line | ToolZoneX",
    description: "Combine two lists of text line by line instantly. Perfect for merging columns of data.",
    url: `${SITE_URL}/tools/text-merger`,
    type: "article",
  },
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Text Merger",
  "description": "Combine two lists of text line by line instantly.",
  "url": `${SITE_URL}/tools/text-merger`,
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
      <TextMerger />
    </>
  );
}
