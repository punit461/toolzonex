import type { Metadata } from "next";
import TemperatureConverter from "../../../calculators/converters/TemperatureConverter";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "Temperature Converter - Celsius, Fahrenheit & Kelvin",
  description: "Free temperature converter. Convert between Celsius, Fahrenheit, and Kelvin instantly.",
  keywords: ["temperature converter","celsius to fahrenheit","fahrenheit to celsius","kelvin converter","c to f"],
  alternates: { canonical: "/converters/temperature-converter" },
  openGraph: {
    title: "Temperature Converter - Celsius, Fahrenheit & Kelvin | ToolZoneX",
    description: "Free temperature converter. Convert between Celsius, Fahrenheit, and Kelvin instantly.",
    url: `${SITE_URL}/converters/temperature-converter`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "TemperatureConverter",
  "description": "Free temperature converter. Convert between Celsius, Fahrenheit, and Kelvin instantly.",
  "url": `${SITE_URL}/converters/temperature-converter`,
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
      <TemperatureConverter />
    </>
  );
}
