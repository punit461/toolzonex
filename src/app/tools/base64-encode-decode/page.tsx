import type { Metadata } from "next";
import Base64Converter from "../../../calculators/Base64Converter";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://punit461.github.io/toolzonex';

export const metadata: Metadata = {
  title: "Base64 Encode and Decode - Free Online Converter",
  description: "Easily encode plain text to Base64 or decode Base64 strings to plain text. Free online Base64 converter supporting UTF-8.",
  keywords: ["base64 encoder", "base64 decoder", "encode to base64", "decode base64", "online base64 tool"],
  alternates: { canonical: "/tools/base64-encode-decode" },
  openGraph: {
    title: "Base64 Encode and Decode - Free Online Converter | ToolZoneX",
    description: "Easily encode plain text to Base64 or decode Base64 strings to plain text.",
    url: `${SITE_URL}/tools/base64-encode-decode`,
    type: "article",
  },
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Base64 Encode and Decode",
  "description": "Easily encode plain text to Base64 or decode Base64 strings to plain text.",
  "url": `${SITE_URL}/tools/base64-encode-decode`,
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
      <Base64Converter />
    </>
  );
}
