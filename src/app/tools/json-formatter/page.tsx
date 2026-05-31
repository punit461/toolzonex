import type { Metadata } from "next";
import JsonFormatter from "../../../calculators/JsonFormatter";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://punit461.github.io/toolzonex';

export const metadata: Metadata = {
  title: "JSON Formatter & Validator - Free Online Developer Tool",
  description: "Format, validate, and minify JSON data instantly in your browser. Free online developer tool.",
  keywords: ["json formatter", "json validator", "json parser", "json beautifier", "minify json"],
  alternates: { canonical: "/tools/json-formatter" },
  openGraph: {
    title: "JSON Formatter & Validator - Free Online Developer Tool | ToolZoneX",
    description: "Format, validate, and minify JSON data instantly in your browser.",
    url: `${SITE_URL}/tools/json-formatter`,
    type: "article",
  },
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "JSON Formatter & Validator",
  "description": "Format, validate, and minify JSON data instantly in your browser.",
  "url": `${SITE_URL}/tools/json-formatter`,
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
