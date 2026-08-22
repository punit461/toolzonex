import type { Metadata } from "next";
import BusinessNameGenerator from "../../../calculators/generators/BusinessNameGenerator";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "Business Name Generator - Startup & App Name Ideas Online",
  description: "Generate catchy and brandable business names, app names, and startup ideas instantly. Free online name creator.",
  keywords: ["business name generator", "startup name generator", "app name generator", "company name ideas", "brand name generator"],
  alternates: { canonical: "/generators/business-name-generator" },
  openGraph: {
    title: "Business Name Generator - Startup & App Name Ideas Online | ToolZoneX",
    description: "Generate catchy and brandable business names, app names, and startup ideas instantly.",
    url: `${SITE_URL}/generators/business-name-generator`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Business Name Generator",
  "description": "Generate catchy and brandable business names, app names, and startup ideas instantly.",
  "url": `${SITE_URL}/generators/business-name-generator`,
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
