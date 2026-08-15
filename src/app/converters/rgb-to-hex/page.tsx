import type { Metadata } from "next";
import RgbToHexConverter from "../../../calculators/RgbToHexConverter";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "RGB to HEX Converter - Free Online Color Tool",
  description: "Convert RGB and RGBA color codes to HEX format instantly. Free online color conversion tool with interactive sliders for web developers.",
  keywords: ["rgb to hex", "rgb converter", "rgba to hex", "hex generator", "color code converter"],
  alternates: { canonical: "/converters/rgb-to-hex" },
  openGraph: {
    title: "RGB to HEX Converter - Free Online Color Tool | ToolZoneX",
    description: "Convert RGB and RGBA color codes to HEX format instantly.",
    url: `${SITE_URL}/converters/rgb-to-hex`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "RGB to HEX Converter",
  "description": "Convert RGB and RGBA color codes to HEX format instantly.",
  "url": `${SITE_URL}/converters/rgb-to-hex`,
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
      <RgbToHexConverter />
    </>
  );
}
