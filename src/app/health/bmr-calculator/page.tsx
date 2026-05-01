import type { Metadata } from "next";
import BMRCalculator from "../../../calculators/BMRCalculator";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://punit461.github.io/toolzonex';

export const metadata: Metadata = {
  title: "BMR Calculator - Basal Metabolic Rate using Mifflin-St Jeor",
  description: "Free BMR calculator to calculate Basal Metabolic Rate using Mifflin-St Jeor equation. Understand your body's calorie needs at rest for effective diet planning.",
  keywords: ["BMR calculator", "basal metabolic rate", "Mifflin-St Jeor", "metabolism", "calorie needs", "BMR formula", "metabolic rate"],
  alternates: { canonical: "/health/bmr-calculator" },
  openGraph: {
    title: "BMR Calculator - Basal Metabolic Rate | ToolZoneX",
    description: "Calculate BMR using Mifflin-St Jeor equation.",
    url: `${SITE_URL}/health/bmr-calculator`,
    type: "article",
  },
};

const bmrCalculatorSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "BMR Calculator",
  "description": "Calculate Basal Metabolic Rate using Mifflin-St Jeor.",
  "url": `${SITE_URL}/health/bmr-calculator`,
  "applicationCategory": "HealthApplication",
  "operatingSystem": "Web Browser",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "INR" },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(bmrCalculatorSchema) }}
      />
      <BMRCalculator />
    </>
  );
}
