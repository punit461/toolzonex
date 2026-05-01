import type { Metadata } from "next";
import TDEECalculator from "../../../calculators/TDEECalculator";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://punit461.github.io/toolzonex';

export const metadata: Metadata = {
  title: "TDEE Calculator - Total Daily Energy Expenditure",
  description: "Free TDEE calculator to calculate total daily calories burned based on activity level. Perfect for fitness tracking, weight loss, and muscle gain goals.",
  keywords: ["TDEE calculator", "total daily energy expenditure", "calories burned", "daily calorie needs", "fitness calculator", "weight loss calculator", "macro calculator"],
  alternates: { canonical: "/health/tdee-calculator" },
  openGraph: {
    title: "TDEE Calculator - Total Daily Energy Expenditure | ToolZoneX",
    description: "Calculate total daily calories burned based on activity level.",
    url: `${SITE_URL}/health/tdee-calculator`,
    type: "article",
  },
};

const tdeeCalculatorSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "TDEE Calculator",
  "description": "Calculate Total Daily Energy Expenditure by activity.",
  "url": `${SITE_URL}/health/tdee-calculator`,
  "applicationCategory": "HealthApplication",
  "operatingSystem": "Web Browser",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "INR" },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(tdeeCalculatorSchema) }}
      />
      <TDEECalculator />
    </>
  );
}
