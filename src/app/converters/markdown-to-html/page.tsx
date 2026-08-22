import type { Metadata } from "next";
import MarkdownToHtmlConverter from "../../../calculators/converters/MarkdownToHtmlConverter";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "Markdown to HTML Converter - Convert MD to HTML Online",
  description: "Convert Markdown to raw HTML instantly, online and free. Live web preview included -- no install needed.",
  keywords: ["markdown to html", "markdown converter", "parse markdown", "md to html", "online markdown editor", "convert md to html online", "markdown to html online", "markdown to html converter online"],
  alternates: { canonical: "/converters/markdown-to-html" },
  openGraph: {
    title: "Markdown to HTML Converter - Convert MD to HTML Online | ToolZoneX",
    description: "Convert Markdown to raw HTML instantly, online and free.",
    url: `${SITE_URL}/converters/markdown-to-html`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Markdown to HTML Converter",
  "description": "Convert Markdown to raw HTML instantly.",
  "url": `${SITE_URL}/converters/markdown-to-html`,
  "applicationCategory": "DeveloperApplication",
  "operatingSystem": "Web Browser",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "INR" },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Does this support GitHub-flavored Markdown extras like tables?",
      "acceptedAnswer": { "@type": "Answer", "text": "It covers the core Markdown syntax (headings, bold/italic, links, lists, code) — extended syntax such as tables or task lists may not be converted." }
    },
    {
      "@type": "Question",
      "name": "Is this markdown to html converter online free to use?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes — it's completely free, requires no sign-up, and runs entirely in your browser, so nothing you type is uploaded to a server." }
    },
    {
      "@type": "Question",
      "name": "Can I convert md to html online without installing anything?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes — just paste or type your Markdown into the input box and click Convert to HTML. There's nothing to install; it works directly in this page." }
    },
    {
      "@type": "Question",
      "name": "Can I preview how the HTML will look before copying it?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes — after converting, a live preview panel renders the generated HTML below the input and output boxes so you can check the formatting before you copy it." }
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
      <MarkdownToHtmlConverter />
    </>
  );
}
