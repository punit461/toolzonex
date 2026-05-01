import type { Metadata } from "next";
import PercentageCalculator from "../../../calculators/PercentageCalculator";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://punit461.github.io/toolzonex';

export const metadata: Metadata = {
  title: "Percentage Calculator - Calculate Percentages Easily",
  description: "Free percentage calculator to calculate percentages, percentage increase/decrease, and percentage of any number. Perfect for discounts, marks, and calculations.",
  keywords: ["percentage calculator", "calculate percentage", "percentage increase", "percentage decrease", "percentage of number", "discount calculator", "mark percentage"],
  alternates: { canonical: "/utilities/percentage-calculator" },
  openGraph: {
    title: "Percentage Calculator - Calculate Percentages Easily | ToolZoneX",
    description: "Calculate percentages, percentage increase/decrease, and percentage of any number.",
    url: `${SITE_URL}/utilities/percentage-calculator`,
    type: "article",
  },
};

const percentageCalculatorSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Percentage Calculator",
  "description": "Calculate percentages easily.",
  "url": `${SITE_URL}/utilities/percentage-calculator`,
  "applicationCategory": "UtilityApplication",
  "operatingSystem": "Web Browser",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "INR" },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(percentageCalculatorSchema) }}
      />
      <PercentageCalculator />
    </>
  );
}
