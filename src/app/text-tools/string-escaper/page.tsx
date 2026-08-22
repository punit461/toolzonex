import type { Metadata } from "next";
import StringEscaper from "../../../calculators/text-tools/StringEscaper";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "String Escaper & Encoder - JSON, HTML, URL Online",
  description: "Escape or unescape strings for JSON, HTML entities, or URL encoding. Free online developer utility to safely format code strings.",
  keywords: ["string escaper", "json escape", "html entities encode", "url encode", "url decode", "unescape string"],
  alternates: { canonical: "/text-tools/string-escaper" },
  openGraph: {
    title: "String Escaper & Encoder - JSON, HTML, URL Online | ToolZoneX",
    description: "Escape or unescape strings for JSON, HTML entities, or URL encoding. Free online developer utility.",
    url: `${SITE_URL}/text-tools/string-escaper`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "String Escaper & Encoder",
  "description": "Escape or unescape strings for JSON, HTML entities, or URL encoding.",
  "url": `${SITE_URL}/text-tools/string-escaper`,
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
