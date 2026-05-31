import type { Metadata } from "next";
import WordWrapTool from "../../../calculators/WordWrapTool";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://punit461.github.io/toolzonex';

export const metadata: Metadata = {
  title: "Word Wrap Tool - Wrap Text to Column Limit Online",
  description: "Automatically wrap text to a specific character limit or column width. Free online text formatter to fix long lines without breaking words.",
  keywords: ["word wrap tool", "wrap text online", "column limit formatter", "80 characters per line", "wrap long text lines"],
  alternates: { canonical: "/tools/word-wrap-tool" },
  openGraph: {
    title: "Word Wrap Tool - Wrap Text to Column Limit Online | ToolZoneX",
    description: "Automatically wrap text to a specific character limit or column width.",
    url: `${SITE_URL}/tools/word-wrap-tool`,
    type: "article",
  },
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Word Wrap Tool",
  "description": "Automatically wrap text to a specific character limit or column width.",
  "url": `${SITE_URL}/tools/word-wrap-tool`,
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
      <WordWrapTool />
    </>
  );
}
