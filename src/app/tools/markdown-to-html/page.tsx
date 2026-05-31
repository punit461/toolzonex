import type { Metadata } from "next";
import MarkdownToHtmlConverter from "../../../calculators/MarkdownToHtmlConverter";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://punit461.github.io/toolzonex';

export const metadata: Metadata = {
  title: "Markdown to HTML Converter - Free Online Parser",
  description: "Convert Markdown to raw HTML instantly. Free online parser with live web preview.",
  keywords: ["markdown to html", "markdown converter", "parse markdown", "md to html", "online markdown editor"],
  alternates: { canonical: "/tools/markdown-to-html" },
  openGraph: {
    title: "Markdown to HTML Converter - Free Online Parser | ToolZoneX",
    description: "Convert Markdown to raw HTML instantly.",
    url: `${SITE_URL}/tools/markdown-to-html`,
    type: "article",
  },
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Markdown to HTML Converter",
  "description": "Convert Markdown to raw HTML instantly.",
  "url": `${SITE_URL}/tools/markdown-to-html`,
  "applicationCategory": "DeveloperApplication",
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
      <MarkdownToHtmlConverter />
    </>
  );
}
