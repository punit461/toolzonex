import type { Metadata } from "next";
import LengthConverter from "../../../calculators/converters/LengthConverter";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "Length Converter - Meters, Feet, Miles, Inches & More",
  description: "Free length converter. Convert between meters, kilometers, centimeters, millimeters, miles, yards, feet, inches, and light years.",
  keywords: ["length converter","meters to feet","cm to inches","km to miles","unit converter length","distance converter"],
  alternates: { canonical: "/converters/length-converter" },
  openGraph: {
    title: "Length Converter - Meters, Feet, Miles, Inches & More | ToolZoneX",
    description: "Free length converter. Convert between meters, kilometers, centimeters, millimeters, miles, yards, feet, inches, and light years.",
    url: `${SITE_URL}/converters/length-converter`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "LengthConverter",
  "description": "Free length converter. Convert between meters, kilometers, centimeters, millimeters, miles, yards, feet, inches, and light years.",
  "url": `${SITE_URL}/converters/length-converter`,
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
      <LengthConverter />
    </>
  );
}
