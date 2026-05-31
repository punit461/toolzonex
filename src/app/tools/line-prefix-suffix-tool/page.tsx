import type { Metadata } from "next";
import LinePrefixSuffix from "../../../calculators/LinePrefixSuffixTool";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://punit461.github.io/toolzonex';

export const metadata: Metadata = {
  title: "Add Prefix & Suffix to Lines Online - Text Formatting Tool",
  description: "Add text to the beginning or end of every line instantly. Free online list formatting tool for developers to add prefixes or suffixes to text lists.",
  keywords: ["line prefix tool", "add prefix to text", "add suffix to text", "add text to each line", "format list online"],
  alternates: { canonical: "/tools/line-prefix-suffix-tool" },
  openGraph: {
    title: "Add Prefix & Suffix to Lines Online - Text Formatting Tool | ToolZoneX",
    description: "Add text to the beginning or end of every line instantly. Free online list formatting tool.",
    url: `${SITE_URL}/tools/line-prefix-suffix-tool`,
    type: "article",
  },
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Line Prefix & Suffix Tool",
  "description": "Add text to the beginning or end of every line instantly.",
  "url": `${SITE_URL}/tools/line-prefix-suffix-tool`,
  "applicationCategory": "UtilityApplication",
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
      <LinePrefixSuffix />
    </>
  );
}
