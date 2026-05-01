import type { Metadata } from "next";
import AgeCalculator from "../../../calculators/AgeCalculator";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://punit461.github.io/toolzonex';

export const metadata: Metadata = {
  title: "Age Calculator - Calculate Exact Age in Years, Months, Days",
  description: "Free age calculator to calculate exact age in years, months, and days. Find your age on any specific date with this accurate date difference calculator.",
  keywords: ["age calculator", "calculate age", "age in years months days", "date difference", "birthday calculator", "age finder", "date calculator"],
  alternates: { canonical: "/utilities/age-calculator" },
  openGraph: {
    title: "Age Calculator - Calculate Exact Age in Years, Months, Days | ToolZoneX",
    description: "Calculate exact age in years, months, and days.",
    url: `${SITE_URL}/utilities/age-calculator`,
    type: "article",
  },
};

const ageCalculatorSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Age Calculator",
  "description": "Calculate exact age in years, months, and days.",
  "url": `${SITE_URL}/utilities/age-calculator`,
  "applicationCategory": "UtilityApplication",
  "operatingSystem": "Web Browser",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "INR" },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ageCalculatorSchema) }}
      />
      <AgeCalculator />
    </>
  );
}
