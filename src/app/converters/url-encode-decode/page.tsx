import type { Metadata } from "next";
import UrlEncoder from "../../../calculators/converters/UrlEncoder";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "URL Encode and Decode - Free Online Converter",
  description: "Easily URL encode plain text or decode URL encoded strings back to plain text. Free online developer tool.",
  keywords: ["url encode", "url decode", "encode url online", "decode url", "url component encoder"],
  alternates: { canonical: "/converters/url-encode-decode" },
  openGraph: {
    title: "URL Encode and Decode - Free Online Converter | ToolZoneX",
    description: "Easily URL encode plain text or decode URL encoded strings back to plain text.",
    url: `${SITE_URL}/converters/url-encode-decode`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "URL Encode and Decode",
  "description": "Easily URL encode plain text or decode URL encoded strings back to plain text.",
  "url": `${SITE_URL}/converters/url-encode-decode`,
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
