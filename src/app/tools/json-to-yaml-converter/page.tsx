import type { Metadata } from "next";
import JsonToYamlConverter from "../../../calculators/JsonToYamlConverter";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://punit461.github.io/toolzonex';

export const metadata: Metadata = {
  title: "JSON to YAML Converter - Free Developer Tool",
  description: "Convert JSON to YAML format instantly online. Free developer utility for configs.",
  keywords: ["json to yaml", "json 2 yaml", "convert json to yaml", "json parser online", "yaml generator"],
  alternates: { canonical: "/tools/json-to-yaml-converter" },
  openGraph: {
    title: "JSON to YAML Converter - Free Developer Tool | ToolZoneX",
    description: "Convert JSON to YAML format instantly online. Free developer utility for configs.",
    url: `${SITE_URL}/tools/json-to-yaml-converter`,
    type: "article",
  },
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "JSON to YAML Converter",
  "description": "Convert JSON to YAML format instantly online.",
  "url": `${SITE_URL}/tools/json-to-yaml-converter`,
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
