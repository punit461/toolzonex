import type { Metadata } from "next";
import GradientLibrary from "../../../calculators/developer-tools/GradientLibrary";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "Gradient Library - Curated CSS Gradients",
  description: "Find the perfect gradient for your project from a curated, filterable collection of ready-to-use CSS gradients.",
  keywords: ["gradient library", "css gradients", "gradient examples", "gradient presets", "background gradient ideas"],
  alternates: { canonical: "/developer-tools/gradient-library" },
  openGraph: {
    title: "Gradient Library - Curated CSS Gradients | ToolZoneX",
    description: "Find the perfect gradient for your project from a curated, filterable collection.",
    url: `${SITE_URL}/developer-tools/gradient-library`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Gradient Library",
  "description": "Browse a curated collection of ready-to-use CSS gradients.",
  "url": `${SITE_URL}/developer-tools/gradient-library`,
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
      <GradientLibrary />
    </>
  );
}
