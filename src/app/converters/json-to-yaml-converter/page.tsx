import type { Metadata } from "next";
import JsonToYamlConverter from "../../../calculators/converters/JsonToYamlConverter";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "JSON to YAML Converter - Free Developer Tool",
  description: "Convert JSON to YAML format instantly online. Free developer utility for configs.",
  keywords: ["json to yaml", "json 2 yaml", "convert json to yaml", "json parser online", "yaml generator"],
  alternates: { canonical: "/converters/json-to-yaml-converter" },
  openGraph: {
    title: "JSON to YAML Converter - Free Developer Tool | ToolZoneX",
    description: "Convert JSON to YAML format instantly online. Free developer utility for configs.",
    url: `${SITE_URL}/converters/json-to-yaml-converter`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "JSON to YAML Converter",
  "description": "Convert JSON to YAML format instantly online.",
  "url": `${SITE_URL}/converters/json-to-yaml-converter`,
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
      <JsonToYamlConverter />
    </>
  );
}
