import type { Metadata } from "next";
import VolumeConverter from "../../../calculators/converters/VolumeConverter";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "Volume Converter - Liters, Gallons, Cups & More",
  description: "Free volume converter. Convert between liters, milliliters, cubic meters, US gallons, quarts, pints, cups, and fluid ounces.",
  keywords: ["volume converter","liters to gallons","cups to ml","gallons to liters","volume unit converter"],
  alternates: { canonical: "/converters/volume-converter" },
  openGraph: {
    title: "Volume Converter - Liters, Gallons, Cups & More | ToolZoneX",
    description: "Free volume converter. Convert between liters, milliliters, cubic meters, US gallons, quarts, pints, cups, and fluid ounces.",
    url: `${SITE_URL}/converters/volume-converter`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "VolumeConverter",
  "description": "Free volume converter. Convert between liters, milliliters, cubic meters, US gallons, quarts, pints, cups, and fluid ounces.",
  "url": `${SITE_URL}/converters/volume-converter`,
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
      <VolumeConverter />
    </>
  );
}
