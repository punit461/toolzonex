import type { Metadata } from "next";
import FlexboxGenerator from "../../../calculators/FlexboxGenerator";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "Flexbox Generator - CSS Layout Tool Online",
  description: "Visually generate CSS Flexbox layouts. Test alignment, wrapping, and direction, then copy the CSS code instantly.",
  keywords: ["flexbox generator", "css flexbox", "flexbox playground", "css layout tool", "display flex"],
  alternates: { canonical: "/developer-tools/flexbox-generator" },
  openGraph: {
    title: "Flexbox Generator - CSS Layout Tool Online | ToolZoneX",
    description: "Visually generate CSS Flexbox layouts. Test alignment, wrapping, and direction, then copy the CSS code instantly.",
    url: `${SITE_URL}/developer-tools/flexbox-generator`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Flexbox Generator",
  "description": "Visually generate CSS Flexbox layouts. Test alignment, wrapping, and direction, then copy the CSS code instantly.",
  "url": `${SITE_URL}/developer-tools/flexbox-generator`,
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
      <FlexboxGenerator />
    </>
  );
}
