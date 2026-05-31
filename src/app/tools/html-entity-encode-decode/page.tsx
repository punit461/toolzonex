import type { Metadata } from "next";
import HtmlEntityEncoder from "../../../calculators/HtmlEntityEncoder";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://punit461.github.io/toolzonex';

export const metadata: Metadata = {
  title: "HTML Entity Encode and Decode - Free Online Converter",
  description: "Easily encode special characters into HTML entities or decode them back to plain text. Free online developer tool.",
  keywords: ["html entity encode", "html entity decode", "encode html online", "decode html characters", "character encoder"],
  alternates: { canonical: "/tools/html-entity-encode-decode" },
  openGraph: {
    title: "HTML Entity Encode and Decode - Free Online Converter | ToolZoneX",
    description: "Easily encode special characters into HTML entities or decode them back to plain text.",
    url: `${SITE_URL}/tools/html-entity-encode-decode`,
    type: "article",
  },
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "HTML Entity Encode and Decode",
  "description": "Easily encode special characters into HTML entities or decode them back to plain text.",
  "url": `${SITE_URL}/tools/html-entity-encode-decode`,
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
