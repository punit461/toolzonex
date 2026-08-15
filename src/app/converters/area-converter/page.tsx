import type { Metadata } from "next";
import AreaConverter from "../../../calculators/converters/AreaConverter";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "Area Converter - Square Meters, Acres, Hectares & More",
  description: "Free area converter. Convert between square meters, square kilometers, hectares, acres, square feet, and more.",
  keywords: ["area converter","sq meters to sq feet","acres to hectares","area unit converter","square feet converter"],
  alternates: { canonical: "/converters/area-converter" },
  openGraph: {
    title: "Area Converter - Square Meters, Acres, Hectares & More | ToolZoneX",
    description: "Free area converter. Convert between square meters, square kilometers, hectares, acres, square feet, and more.",
    url: `${SITE_URL}/converters/area-converter`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "AreaConverter",
  "description": "Free area converter. Convert between square meters, square kilometers, hectares, acres, square feet, and more.",
  "url": `${SITE_URL}/converters/area-converter`,
  "applicationCategory": "UtilityApplication",
  "operatingSystem": "Web Browser",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(toolSchema) }}
      />
      <AreaConverter />
    </>
  );
}
