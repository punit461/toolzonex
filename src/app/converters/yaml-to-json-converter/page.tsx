import type { Metadata } from "next";
import YamlToJsonConverter from "../../../calculators/YamlToJsonConverter";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "YAML to JSON Converter - Free Developer Tool",
  description: "Convert YAML configurations to JSON format instantly online. Free developer utility.",
  keywords: ["yaml to json", "yaml 2 json", "convert yaml to json", "yaml parser online"],
  alternates: { canonical: "/converters/yaml-to-json-converter" },
  openGraph: {
    title: "YAML to JSON Converter - Free Developer Tool | ToolZoneX",
    description: "Convert YAML configurations to JSON format instantly online. Free developer utility.",
    url: `${SITE_URL}/converters/yaml-to-json-converter`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "YAML to JSON Converter",
  "description": "Convert YAML configurations to JSON format instantly online.",
  "url": `${SITE_URL}/converters/yaml-to-json-converter`,
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
      <YamlToJsonConverter />
    </>
  );
}
