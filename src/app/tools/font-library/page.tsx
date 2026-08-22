import type { Metadata } from "next";
import FontLibrary from "../../../calculators/FontLibrary";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "Font Library - Browse & Preview Google Fonts",
  description: "Find the perfect font for your next design project. Search, filter, and preview a curated library of Google Fonts.",
  keywords: ["font library", "google fonts browser", "font preview tool", "typeface finder", "font pairing"],
  alternates: { canonical: "/tools/font-library" },
  openGraph: {
    title: "Font Library - Browse & Preview Google Fonts | ToolZoneX",
    description: "Find the perfect font for your next design project.",
    url: `${SITE_URL}/tools/font-library`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Font Library",
  "description": "Search, filter, and preview a curated library of Google Fonts.",
  "url": `${SITE_URL}/tools/font-library`,
  "applicationCategory": "DesignApplication",
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
      <FontLibrary />
    </>
  );
}
