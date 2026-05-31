import type { Metadata } from "next";
import CssGridGenerator from "../../../calculators/CssGridGenerator";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://punit461.github.io/toolzonex';

export const metadata: Metadata = {
  title: "CSS Grid Generator - Grid Layout Tool Online",
  description: "Visually generate CSS Grid layouts. Define columns, rows, and gaps, and copy the CSS code instantly.",
  keywords: ["css grid generator", "css grid", "grid playground", "css layout generator", "display grid"],
  alternates: { canonical: "/tools/css-grid-generator" },
  openGraph: {
    title: "CSS Grid Generator - Grid Layout Tool Online | ToolZoneX",
    description: "Visually generate CSS Grid layouts. Define columns, rows, and gaps, and copy the CSS code instantly.",
    url: `${SITE_URL}/tools/css-grid-generator`,
    type: "article",
  },
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "CSS Grid Generator",
  "description": "Visually generate CSS Grid layouts. Define columns, rows, and gaps, and copy the CSS code instantly.",
  "url": `${SITE_URL}/tools/css-grid-generator`,
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
      <CssGridGenerator />
    </>
  );
}
