import type { Metadata } from "next";
import ColorPaletteGenerator from "../../../calculators/ColorPaletteGenerator";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://punit461.github.io/toolzonex';

export const metadata: Metadata = {
  title: "Color Palette Generator - Random Hex Colors",
  description: "Generate beautiful random color palettes for web design and art. One click to copy hex codes.",
  keywords: ["color palette generator", "random colors", "hex code generator", "color scheme generator", "website colors"],
  alternates: { canonical: "/tools/color-palette-generator" },
  openGraph: {
    title: "Color Palette Generator - Random Hex Colors | ToolZoneX",
    description: "Generate beautiful random color palettes for web design and art. One click to copy hex codes.",
    url: `${SITE_URL}/tools/color-palette-generator`,
    type: "article",
  },
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Color Palette Generator",
  "description": "Generate beautiful random color palettes for web design and art.",
  "url": `${SITE_URL}/tools/color-palette-generator`,
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
      <ColorPaletteGenerator />
    </>
  );
}
