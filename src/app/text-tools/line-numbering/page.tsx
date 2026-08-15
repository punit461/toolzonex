import type { Metadata } from "next";
import LineNumbering from "../../../calculators/LineNumbering";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "Line Numbering - Add Numbers to Text Lines Online",
  description: "Automatically add line numbers to text or lists. Free online utility for coding, document formatting, and text manipulation.",
  keywords: ["line numbering", "add numbers to lines", "number text lines", "list numbering tool", "auto number list"],
  alternates: { canonical: "/text-tools/line-numbering" },
  openGraph: {
    title: "Line Numbering - Add Numbers to Text Lines Online | ToolZoneX",
    description: "Automatically add line numbers to text or lists. Free online utility.",
    url: `${SITE_URL}/text-tools/line-numbering`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Line Numbering",
  "description": "Automatically add line numbers to text or lists.",
  "url": `${SITE_URL}/text-tools/line-numbering`,
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
      <LineNumbering />
    </>
  );
}
