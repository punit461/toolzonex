import type { Metadata } from "next";
import WordWrapTool from "../../../calculators/WordWrapTool";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "Word Wrap Tool - Wrap Text to Column Limit Online",
  description: "Automatically wrap text to a specific character limit or column width. Free online text formatter to fix long lines without breaking words.",
  keywords: ["word wrap tool", "wrap text online", "column limit formatter", "80 characters per line", "wrap long text lines", "wordwrap"],
  alternates: { canonical: "/text-tools/word-wrap-tool" },
  openGraph: {
    title: "Word Wrap Tool - Wrap Text to Column Limit Online | ToolZoneX",
    description: "Automatically wrap text to a specific character limit or column width.",
    url: `${SITE_URL}/text-tools/word-wrap-tool`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Word Wrap Tool",
  "description": "Automatically wrap text to a specific character limit or column width.",
  "url": `${SITE_URL}/text-tools/word-wrap-tool`,
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
      "name": "Is this the same as a \"wordwrap\" tool?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes — \"wordwrap\" and \"word wrap\" both refer to automatically breaking long lines of text at a set character or column width, which is exactly what this tool does." }
    },
    {
      "@type": "Question",
      "name": "Does it break words in the middle to fit the line length?",
      "acceptedAnswer": { "@type": "Answer", "text": "No — the tool wraps at word boundaries, so words are never split mid-word." }
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
      <WordWrapTool />
    </>
  );
}
