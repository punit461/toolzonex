import type { Metadata } from "next";
import PFTCalculator from "../../../calculators/PFTCalculator";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://punit461.github.io/toolzonex';

export const metadata: Metadata = {
  title: "PFT Calculator - Physical Fitness Test Assessment",
  description: "Free PFT calculator to assess your physical fitness levels with multiple parameters. Track your fitness journey with comprehensive fitness test assessments.",
  keywords: ["PFT calculator", "physical fitness test", "fitness assessment", "fitness level", "physical fitness", "fitness tracking", "APFT"],
  alternates: { canonical: "/health/pft-calculator" },
  openGraph: {
    title: "PFT Calculator - Physical Fitness Test | ToolZoneX",
    description: "Assess your physical fitness levels with multiple parameters.",
    url: `${SITE_URL}/health/pft-calculator`,
    type: "article",
  },
};

const pftCalculatorSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "PFT Calculator",
  "description": "Assess physical fitness levels with multiple parameters.",
  "url": `${SITE_URL}/health/pft-calculator`,
  "applicationCategory": "HealthApplication",
  "operatingSystem": "Web Browser",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "INR" },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pftCalculatorSchema) }}
      />
      <PFTCalculator />
    </>
  );
}
