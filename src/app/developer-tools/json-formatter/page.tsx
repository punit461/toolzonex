import type { Metadata } from "next";
import JsonFormatter from "../../../calculators/developer-tools/JsonFormatter";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "JSON Formatter & Validator - Free Online Developer Tool",
  description: "Format, validate, and minify JSON data instantly in your browser. Free online developer tool.",
  keywords: ["json formatter", "json validator", "json parser", "json beautifier", "minify json"],
  alternates: { canonical: "/developer-tools/json-formatter" },
  openGraph: {
    title: "JSON Formatter & Validator - Free Online Developer Tool | ToolZoneX",
    description: "Format, validate, and minify JSON data instantly in your browser.",
    url: `${SITE_URL}/developer-tools/json-formatter`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "JSON Formatter & Validator",
  "description": "Format, validate, and minify JSON data instantly in your browser.",
  "url": `${SITE_URL}/developer-tools/json-formatter`,
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
      <JsonFormatter />
    </>
  );
}
