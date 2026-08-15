import type { Metadata } from "next";
import VerticalTextGenerator from "../../../calculators/VerticalTextGenerator";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "Vertical Text Generator - Stack Text Vertically",
  description: "Convert your text into vertical aesthetic formats for social media and chats instantly.",
  keywords: ["vertical text generator", "stack text", "vertical letters", "aesthetic text vertical", "text column generator"],
  alternates: { canonical: "/generators/vertical-text-generator" },
  openGraph: {
    title: "Vertical Text Generator - Stack Text Vertically | ToolZoneX",
    description: "Convert your text into vertical aesthetic formats for social media and chats instantly.",
    url: `${SITE_URL}/generators/vertical-text-generator`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Vertical Text Generator",
  "description": "Convert your text into vertical aesthetic formats for social media and chats instantly.",
  "url": `${SITE_URL}/generators/vertical-text-generator`,
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
      <VerticalTextGenerator />
    </>
  );
}
