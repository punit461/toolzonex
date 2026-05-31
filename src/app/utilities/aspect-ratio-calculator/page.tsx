import type { Metadata } from "next";
import AspectRatioCalculator from "../../../calculators/AspectRatioCalculator";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://punit461.github.io/toolzonex';

export const metadata: Metadata = {
  title: "Aspect Ratio Calculator - Find Proportional Dimensions Online",
  description: "Calculate proportional dimensions and aspect ratios for images and videos instantly. Free online aspect ratio tool for designers.",
  keywords: ["aspect ratio calculator", "image resize calculator", "proportional dimensions", "16:9 ratio calculator"],
  alternates: { canonical: "/utilities/aspect-ratio-calculator" },
  openGraph: {
    title: "Aspect Ratio Calculator - Find Proportional Dimensions Online | ToolZoneX",
    description: "Calculate proportional dimensions and aspect ratios for images and videos instantly.",
    url: `${SITE_URL}/utilities/aspect-ratio-calculator`,
    type: "article",
  },
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Aspect Ratio Calculator",
  "description": "Calculate proportional dimensions and aspect ratios for images and videos instantly.",
  "url": `${SITE_URL}/utilities/aspect-ratio-calculator`,
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
      <AspectRatioCalculator />
    </>
  );
}
