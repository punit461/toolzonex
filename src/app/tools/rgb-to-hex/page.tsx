import type { Metadata } from "next";
import RgbToHexConverter from "../../../calculators/RgbToHexConverter";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://punit461.github.io/toolzonex';

export const metadata: Metadata = {
  title: "RGB to HEX Converter - Free Online Color Tool",
  description: "Convert RGB and RGBA color codes to HEX format instantly. Free online color conversion tool with interactive sliders for web developers.",
  keywords: ["rgb to hex", "rgb converter", "rgba to hex", "hex generator", "color code converter"],
  alternates: { canonical: "/tools/rgb-to-hex" },
  openGraph: {
    title: "RGB to HEX Converter - Free Online Color Tool | ToolZoneX",
    description: "Convert RGB and RGBA color codes to HEX format instantly.",
    url: `${SITE_URL}/tools/rgb-to-hex`,
    type: "article",
  },
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "RGB to HEX Converter",
  "description": "Convert RGB and RGBA color codes to HEX format instantly.",
  "url": `${SITE_URL}/tools/rgb-to-hex`,
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
