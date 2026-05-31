import type { Metadata } from "next";
import WhitespaceCleaner from "../../../calculators/WhitespaceCleaner";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://punit461.github.io/toolzonex';

export const metadata: Metadata = {
  title: "Whitespace Cleaner - Remove Extra Spaces & Empty Lines",
  description: "Remove extra spaces, tabs, and empty lines from text automatically. Free online text formatting tool to clean up messy data.",
  keywords: ["whitespace cleaner", "remove extra spaces", "trim text", "remove empty lines", "clean text format", "remove tabs"],
  alternates: { canonical: "/tools/whitespace-cleaner" },
  openGraph: {
    title: "Whitespace Cleaner - Remove Extra Spaces & Empty Lines | ToolZoneX",
    description: "Remove extra spaces, tabs, and empty lines from text automatically. Free online text formatting tool.",
    url: `${SITE_URL}/tools/whitespace-cleaner`,
    type: "article",
  },
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Whitespace Cleaner",
  "description": "Remove extra spaces, tabs, and empty lines from text automatically.",
  "url": `${SITE_URL}/tools/whitespace-cleaner`,
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
