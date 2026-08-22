import type { Metadata } from "next";
import ColorMeanings from "../../../calculators/tools/ColorMeanings";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "Color Meanings - Color Psychology Guide",
  description: "Browse the list of colors and learn about color meanings and psychology for branding and design.",
  keywords: ["color meanings", "color psychology", "what colors mean", "color symbolism", "brand color guide"],
  alternates: { canonical: "/tools/color-meanings" },
  openGraph: {
    title: "Color Meanings - Color Psychology Guide | ToolZoneX",
    description: "Browse the list of colors and learn about color meanings and psychology.",
    url: `${SITE_URL}/tools/color-meanings`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Color Meanings",
  "description": "Browse colors and learn about their meaning and psychology in branding and design.",
  "url": `${SITE_URL}/tools/color-meanings`,
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
      <ColorMeanings />
    </>
  );
}
