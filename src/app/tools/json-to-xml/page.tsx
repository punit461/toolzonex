import type { Metadata } from "next";
import JsonToXmlConverter from "../../../calculators/JsonToXmlConverter";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://punit461.github.io/toolzonex';

export const metadata: Metadata = {
  title: "JSON to XML Converter - Free Online Data Tool",
  description: "Convert JSON strings and files into formatted XML instantly. Free online data converter with copy and download.",
  keywords: ["json to xml", "convert json to xml", "online json converter", "parse json to xml"],
  alternates: { canonical: "/tools/json-to-xml" },
  openGraph: {
    title: "JSON to XML Converter - Free Online Data Tool | ToolZoneX",
    description: "Convert JSON strings and files into formatted XML instantly.",
    url: `${SITE_URL}/tools/json-to-xml`,
    type: "article",
  },
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "JSON to XML Converter",
  "description": "Convert JSON strings and files into formatted XML instantly.",
  "url": `${SITE_URL}/tools/json-to-xml`,
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
