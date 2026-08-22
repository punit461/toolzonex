import type { Metadata } from "next";
import JsonToCsvConverter from "../../../calculators/converters/JsonToCsvConverter";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "JSON to CSV Converter - Free Online Data Tool",
  description: "Convert JSON arrays into CSV format instantly. Free online data conversion tool for developers with export functionality.",
  keywords: ["json to csv", "convert json to csv", "json to excel", "online json converter", "csv exporter"],
  alternates: { canonical: "/converters/json-to-csv" },
  openGraph: {
    title: "JSON to CSV Converter - Free Online Data Tool | ToolZoneX",
    description: "Convert JSON arrays into CSV format instantly.",
    url: `${SITE_URL}/converters/json-to-csv`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "JSON to CSV Converter",
  "description": "Convert JSON arrays into CSV format instantly.",
  "url": `${SITE_URL}/converters/json-to-csv`,
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
      <JsonToCsvConverter />
    </>
  );
}
