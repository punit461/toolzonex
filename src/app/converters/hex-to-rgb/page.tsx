import type { Metadata } from "next";
import HexToRgbConverter from "../../../calculators/HexToRgbConverter";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "HEX to RGB Converter - Free Online Color Tool",
  description: "Convert HEX color codes to RGB or RGBA formats instantly. Free online color conversion tool for web developers and designers.",
  keywords: ["hex to rgb", "hex converter", "color code converter", "rgb generator", "hex to rgba"],
  alternates: { canonical: "/converters/hex-to-rgb" },
  openGraph: {
    title: "HEX to RGB Converter - Free Online Color Tool | ToolZoneX",
    description: "Convert HEX color codes to RGB or RGBA formats instantly.",
    url: `${SITE_URL}/converters/hex-to-rgb`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "HEX to RGB Converter",
  "description": "Convert HEX color codes to RGB or RGBA formats instantly.",
  "url": `${SITE_URL}/converters/hex-to-rgb`,
  "applicationCategory": "DeveloperApplication",
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
      <HexToRgbConverter />
    </>
  );
}
