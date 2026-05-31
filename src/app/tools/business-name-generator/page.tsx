import type { Metadata } from "next";
import BusinessNameGenerator from "../../../calculators/BusinessNameGenerator";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://punit461.github.io/toolzonex';

export const metadata: Metadata = {
  title: "Business Name Generator - Startup & App Name Ideas Online",
  description: "Generate catchy and brandable business names, app names, and startup ideas instantly. Free online name creator.",
  keywords: ["business name generator", "startup name generator", "app name generator", "company name ideas", "brand name generator"],
  alternates: { canonical: "/tools/business-name-generator" },
  openGraph: {
    title: "Business Name Generator - Startup & App Name Ideas Online | ToolZoneX",
    description: "Generate catchy and brandable business names, app names, and startup ideas instantly.",
    url: `${SITE_URL}/tools/business-name-generator`,
    type: "article",
  },
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Business Name Generator",
  "description": "Generate catchy and brandable business names, app names, and startup ideas instantly.",
  "url": `${SITE_URL}/tools/business-name-generator`,
  "applicationCategory": "BusinessApplication",
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
      <BusinessNameGenerator />
    </>
  );
}
