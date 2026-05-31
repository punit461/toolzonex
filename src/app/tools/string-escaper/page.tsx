import type { Metadata } from "next";
import StringEscaper from "../../../calculators/StringEscaper";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://punit461.github.io/toolzonex';

export const metadata: Metadata = {
  title: "String Escaper & Encoder - JSON, HTML, URL Online",
  description: "Escape or unescape strings for JSON, HTML entities, or URL encoding. Free online developer utility to safely format code strings.",
  keywords: ["string escaper", "json escape", "html entities encode", "url encode", "url decode", "unescape string"],
  alternates: { canonical: "/tools/string-escaper" },
  openGraph: {
    title: "String Escaper & Encoder - JSON, HTML, URL Online | ToolZoneX",
    description: "Escape or unescape strings for JSON, HTML entities, or URL encoding. Free online developer utility.",
    url: `${SITE_URL}/tools/string-escaper`,
    type: "article",
  },
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "String Escaper & Encoder",
  "description": "Escape or unescape strings for JSON, HTML entities, or URL encoding.",
  "url": `${SITE_URL}/tools/string-escaper`,
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
      <StringEscaper />
    </>
  );
}
