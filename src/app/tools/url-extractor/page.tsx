import type { Metadata } from "next";
import URLExtractor from "../../../calculators/tools/URLExtractor";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "URL Extractor - Extract Links from Text",
  description: "Extract all URLs from any text. Free online URL extractor tool to find, copy, and open links quickly.",
  keywords: ["URL extractor", "extract links", "find URLs", "link extractor", "URL finder", "copy links", "URL parser", "link scanner"],
  alternates: { canonical: "/tools/url-extractor" },
  openGraph: {
    title: "URL Extractor - Extract Links from Text | ToolZoneX",
    description: "Extract all URLs from any text. Free online URL extractor tool to find, copy, and open links quickly.",
    url: `${SITE_URL}/tools/url-extractor`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
};

const urlExtractorSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "URL Extractor",
  "description": "Extract all URLs from any text. Free online URL extractor tool to find, copy, and open links quickly.",
  "url": `${SITE_URL}/tools/url-extractor`,
  "applicationCategory": "UtilityApplication",
  "operatingSystem": "Web Browser",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "INR" },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(urlExtractorSchema) }}
      />
      <URLExtractor />
    </>
  );
}