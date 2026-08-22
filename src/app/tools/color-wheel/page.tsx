import type { Metadata } from "next";
import ColorWheel from "../../../calculators/ColorWheel";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "Color Wheel - Generate Color Harmonies",
  description: "Easily generate a custom color palette with our interactive color wheel. Explore complementary, analogous, triadic and other harmonies.",
  keywords: ["color wheel", "color harmony generator", "complementary colors", "triadic colors", "analogous colors"],
  alternates: { canonical: "/tools/color-wheel" },
  openGraph: {
    title: "Color Wheel - Generate Color Harmonies | ToolZoneX",
    description: "Easily generate a custom color palette with our interactive color wheel.",
    url: `${SITE_URL}/tools/color-wheel`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Color Wheel",
  "description": "Generate complementary, analogous, and other color harmonies from a base color.",
  "url": `${SITE_URL}/tools/color-wheel`,
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
      <ColorWheel />
    </>
  );
}
