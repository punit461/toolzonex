import type { Metadata } from "next";
import HexToRgbConverter from "../../../calculators/HexToRgbConverter";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://punit461.github.io/toolzonex';

export const metadata: Metadata = {
  title: "HEX to RGB Converter - Free Online Color Tool",
  description: "Convert HEX color codes to RGB or RGBA formats instantly. Free online color conversion tool for web developers and designers.",
  keywords: ["hex to rgb", "hex converter", "color code converter", "rgb generator", "hex to rgba"],
  alternates: { canonical: "/tools/hex-to-rgb" },
  openGraph: {
    title: "HEX to RGB Converter - Free Online Color Tool | ToolZoneX",
    description: "Convert HEX color codes to RGB or RGBA formats instantly.",
    url: `${SITE_URL}/tools/hex-to-rgb`,
    type: "article",
  },
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "HEX to RGB Converter",
  "description": "Convert HEX color codes to RGB or RGBA formats instantly.",
  "url": `${SITE_URL}/tools/hex-to-rgb`,
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
