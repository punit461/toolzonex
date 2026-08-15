import type { Metadata } from "next";
import WhitespaceCleaner from "../../../calculators/WhitespaceCleaner";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "Whitespace Cleaner - Remove Extra Spaces & Empty Lines",
  description: "Remove extra spaces, tabs, and empty lines from text automatically. Free online text formatting tool to clean up messy data.",
  keywords: ["whitespace cleaner", "remove extra spaces", "trim text", "remove empty lines", "clean text format", "remove tabs"],
  alternates: { canonical: "/text-tools/whitespace-cleaner" },
  openGraph: {
    title: "Whitespace Cleaner - Remove Extra Spaces & Empty Lines | ToolZoneX",
    description: "Remove extra spaces, tabs, and empty lines from text automatically. Free online text formatting tool.",
    url: `${SITE_URL}/text-tools/whitespace-cleaner`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Whitespace Cleaner",
  "description": "Remove extra spaces, tabs, and empty lines from text automatically.",
  "url": `${SITE_URL}/text-tools/whitespace-cleaner`,
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
      <WhitespaceCleaner />
    </>
  );
}
