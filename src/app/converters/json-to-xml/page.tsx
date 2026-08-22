import type { Metadata } from "next";
import JsonToXmlConverter from "../../../calculators/converters/JsonToXmlConverter";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "JSON to XML Converter - Free Online Data Tool",
  description: "Convert JSON strings and files into formatted XML instantly. Free online data converter with copy and download.",
  keywords: ["json to xml", "convert json to xml", "online json converter", "parse json to xml"],
  alternates: { canonical: "/converters/json-to-xml" },
  openGraph: {
    title: "JSON to XML Converter - Free Online Data Tool | ToolZoneX",
    description: "Convert JSON strings and files into formatted XML instantly.",
    url: `${SITE_URL}/converters/json-to-xml`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "JSON to XML Converter",
  "description": "Convert JSON strings and files into formatted XML instantly.",
  "url": `${SITE_URL}/converters/json-to-xml`,
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
      <JsonToXmlConverter />
    </>
  );
}
