import type { Metadata } from "next";
import BoxShadowGenerator from "../../../calculators/BoxShadowGenerator";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://punit461.github.io/toolzonex';

export const metadata: Metadata = {
  title: "Box Shadow Generator - CSS Drop Shadow Tool",
  description: "Generate beautiful CSS box shadows visually. Customize offset, blur, and spread, and copy the CSS code instantly.",
  keywords: ["box shadow generator", "css drop shadow", "css shadow generator", "box-shadow", "css visualizer"],
  alternates: { canonical: "/tools/box-shadow-generator" },
  openGraph: {
    title: "Box Shadow Generator - CSS Drop Shadow Tool | ToolZoneX",
    description: "Generate beautiful CSS box shadows visually. Customize offset, blur, and spread, and copy the CSS code instantly.",
    url: `${SITE_URL}/tools/box-shadow-generator`,
    type: "article",
  },
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Box Shadow Generator",
  "description": "Generate beautiful CSS box shadows visually. Customize offset, blur, and spread, and copy the CSS code instantly.",
  "url": `${SITE_URL}/tools/box-shadow-generator`,
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
      <BoxShadowGenerator />
    </>
  );
}
