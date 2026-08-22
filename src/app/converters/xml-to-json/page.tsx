import type { Metadata } from "next";
import XmlToJsonConverter from "../../../calculators/converters/XmlToJsonConverter";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "XML to JSON Converter - Free Online Data Tool",
  description: "Convert XML strings and files into formatted JSON instantly. Free online data converter with copy and download.",
  keywords: ["xml to json", "convert xml to json", "online xml converter", "parse xml to json"],
  alternates: { canonical: "/converters/xml-to-json" },
  openGraph: {
    title: "XML to JSON Converter - Free Online Data Tool | ToolZoneX",
    description: "Convert XML strings and files into formatted JSON instantly.",
    url: `${SITE_URL}/converters/xml-to-json`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "XML to JSON Converter",
  "description": "Convert XML strings and files into formatted JSON instantly.",
  "url": `${SITE_URL}/converters/xml-to-json`,
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
      <XmlToJsonConverter />
    </>
  );
}
