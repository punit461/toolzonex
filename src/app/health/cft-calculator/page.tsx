import type { Metadata } from "next";
import CFTCalculator from "../../../calculators/CFTCalculator";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://punit461.github.io/toolzonex';

export const metadata: Metadata = {
  title: "CFT Calculator - Combat Fitness Test Standards",
  description: "Free CFT calculator to calculate combat fitness test standards. Track your military fitness progress with accurate combat fitness test assessments.",
  keywords: ["CFT calculator", "combat fitness test", "military fitness", "combat fitness standards", "army fitness", "CFT score", "combat test"],
  alternates: { canonical: "/health/cft-calculator" },
  openGraph: {
    title: "CFT Calculator - Combat Fitness Test | ToolZoneX",
    description: "Calculate combat fitness test standards.",
    url: `${SITE_URL}/health/cft-calculator`,
    type: "article",
  },
};

const cftCalculatorSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "CFT Calculator",
  "description": "Calculate combat fitness test standards.",
  "url": `${SITE_URL}/health/cft-calculator`,
  "applicationCategory": "HealthApplication",
  "operatingSystem": "Web Browser",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "INR" },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(cftCalculatorSchema) }}
      />
      <CFTCalculator />
    </>
  );
}
