import type { Metadata } from "next";
import HtmlEntityEncoder from "../../../calculators/HtmlEntityEncoder";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "HTML Entity Encode and Decode - Free Online Converter",
  description: "Easily encode special characters into HTML entities or decode them back to plain text. Free online developer tool.",
  keywords: ["html entity encode", "html entity decode", "encode html online", "decode html characters", "character encoder"],
  alternates: { canonical: "/converters/html-entity-encode-decode" },
  openGraph: {
    title: "HTML Entity Encode and Decode - Free Online Converter | ToolZoneX",
    description: "Easily encode special characters into HTML entities or decode them back to plain text.",
    url: `${SITE_URL}/converters/html-entity-encode-decode`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "HTML Entity Encode and Decode",
  "description": "Easily encode special characters into HTML entities or decode them back to plain text.",
  "url": `${SITE_URL}/converters/html-entity-encode-decode`,
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
      <HtmlEntityEncoder />
    </>
  );
}
