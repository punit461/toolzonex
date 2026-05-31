import type { Metadata } from "next";
import XmlToJsonConverter from "../../../calculators/XmlToJsonConverter";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://punit461.github.io/toolzonex';

export const metadata: Metadata = {
  title: "XML to JSON Converter - Free Online Data Tool",
  description: "Convert XML strings and files into formatted JSON instantly. Free online data converter with copy and download.",
  keywords: ["xml to json", "convert xml to json", "online xml converter", "parse xml to json"],
  alternates: { canonical: "/tools/xml-to-json" },
  openGraph: {
    title: "XML to JSON Converter - Free Online Data Tool | ToolZoneX",
    description: "Convert XML strings and files into formatted JSON instantly.",
    url: `${SITE_URL}/tools/xml-to-json`,
    type: "article",
  },
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "XML to JSON Converter",
  "description": "Convert XML strings and files into formatted JSON instantly.",
  "url": `${SITE_URL}/tools/xml-to-json`,
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
