import type { Metadata } from "next";
import BodyFatCalculator from "../../../calculators/BodyFatCalculator";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://punit461.github.io/toolzonex';

export const metadata: Metadata = {
  title: "Body Fat Calculator - US Navy Method",
  description: "Estimate your body fat percentage and lean body mass online using the US Navy tape measure method.",
  keywords: ["body fat calculator", "us navy body fat", "calculate body fat", "fat percentage", "lean mass calculator"],
  alternates: { canonical: "/health/body-fat-calculator" },
  openGraph: {
    title: "Body Fat Calculator - US Navy Method | ToolZoneX",
    description: "Estimate your body fat percentage and lean body mass online using the US Navy tape measure method.",
    url: `${SITE_URL}/health/body-fat-calculator`,
    type: "article",
  },
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Body Fat Calculator",
  "description": "Estimate your body fat percentage and lean body mass online using the US Navy tape measure method.",
  "url": `${SITE_URL}/health/body-fat-calculator`,
  "applicationCategory": "HealthApplication",
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
      <BodyFatCalculator />
    </>
  );
}
