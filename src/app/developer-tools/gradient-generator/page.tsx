import type { Metadata } from "next";
import GradientGenerator from "../../../calculators/GradientGenerator";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "CSS Gradient Generator - Beautiful Linear Gradients",
  description: "Create beautiful CSS linear gradients visually. Pick colors, adjust angles, and copy the CSS background code instantly.",
  keywords: ["css gradient generator", "linear gradient", "gradient maker", "css background", "color gradient"],
  alternates: { canonical: "/developer-tools/gradient-generator" },
  openGraph: {
    title: "CSS Gradient Generator - Beautiful Linear Gradients | ToolZoneX",
    description: "Create beautiful CSS linear gradients visually. Pick colors, adjust angles, and copy the CSS background code instantly.",
    url: `${SITE_URL}/developer-tools/gradient-generator`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "CSS Gradient Generator",
  "description": "Create beautiful CSS linear gradients visually. Pick colors, adjust angles, and copy the CSS background code instantly.",
  "url": `${SITE_URL}/developer-tools/gradient-generator`,
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
      <GradientGenerator />
    </>
  );
}
