import type { Metadata } from "next";
import FlexboxGenerator from "../../../calculators/FlexboxGenerator";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://punit461.github.io/toolzonex';

export const metadata: Metadata = {
  title: "Flexbox Generator - CSS Layout Tool Online",
  description: "Visually generate CSS Flexbox layouts. Test alignment, wrapping, and direction, then copy the CSS code instantly.",
  keywords: ["flexbox generator", "css flexbox", "flexbox playground", "css layout tool", "display flex"],
  alternates: { canonical: "/tools/flexbox-generator" },
  openGraph: {
    title: "Flexbox Generator - CSS Layout Tool Online | ToolZoneX",
    description: "Visually generate CSS Flexbox layouts. Test alignment, wrapping, and direction, then copy the CSS code instantly.",
    url: `${SITE_URL}/tools/flexbox-generator`,
    type: "article",
  },
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Flexbox Generator",
  "description": "Visually generate CSS Flexbox layouts. Test alignment, wrapping, and direction, then copy the CSS code instantly.",
  "url": `${SITE_URL}/tools/flexbox-generator`,
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
