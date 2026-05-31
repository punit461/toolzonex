import type { Metadata } from "next";
import UrlEncoder from "../../../calculators/UrlEncoder";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://punit461.github.io/toolzonex';

export const metadata: Metadata = {
  title: "URL Encode and Decode - Free Online Converter",
  description: "Easily URL encode plain text or decode URL encoded strings back to plain text. Free online developer tool.",
  keywords: ["url encode", "url decode", "encode url online", "decode url", "url component encoder"],
  alternates: { canonical: "/tools/url-encode-decode" },
  openGraph: {
    title: "URL Encode and Decode - Free Online Converter | ToolZoneX",
    description: "Easily URL encode plain text or decode URL encoded strings back to plain text.",
    url: `${SITE_URL}/tools/url-encode-decode`,
    type: "article",
  },
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "URL Encode and Decode",
  "description": "Easily URL encode plain text or decode URL encoded strings back to plain text.",
  "url": `${SITE_URL}/tools/url-encode-decode`,
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
      <UrlEncoder />
    </>
  );
}
