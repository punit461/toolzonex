import type { Metadata } from "next";
import ColorPaletteLibrary from "../../../calculators/ColorPaletteLibrary";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "Color Palette Library - Curated Palettes",
  description: "Browse an expansive list of color palettes and find inspiration for your next design project.",
  keywords: ["color palette library", "color palette ideas", "curated color palettes", "design color inspiration", "color scheme examples"],
  alternates: { canonical: "/tools/color-palette-library" },
  openGraph: {
    title: "Color Palette Library - Curated Palettes | ToolZoneX",
    description: "Browse an expansive list of color palettes and find inspiration for your next project.",
    url: `${SITE_URL}/tools/color-palette-library`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Color Palette Library",
  "description": "Browse a curated collection of color palettes filterable by style.",
  "url": `${SITE_URL}/tools/color-palette-library`,
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
      <ColorPaletteLibrary />
    </>
  );
}
