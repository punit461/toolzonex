import type { Metadata } from "next";
import PercentageCalculator from "../../../calculators/PercentageCalculator";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "Percentage Calculator - Calculate Percentages Easily",
  description: "Free percentage calculator to calculate percentages, percentage increase/decrease, and percentage of any number. Perfect for discounts, marks, and calculations.",
  keywords: ["percentage calculator", "calculate percentage", "percentage increase", "percentage decrease", "percentage of number", "discount calculator", "mark percentage", "percentage over target calculator", "percentage above target", "actual vs target percentage"],
  alternates: { canonical: "/utilities/percentage-calculator" },
  openGraph: {
    title: "Percentage Calculator - Calculate Percentages Easily | ToolZoneX",
    description: "Calculate percentages, percentage increase/decrease, and percentage of any number.",
    url: `${SITE_URL}/utilities/percentage-calculator`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
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

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How do I calculate percentage over or under a target value?",
      "acceptedAnswer": { "@type": "Answer", "text": "Use calculator #2 ('X is what % of Y?') with X as your actual value and Y as your target — the result shows actual as a percentage of target, where anything above 100% means you exceeded the target and below 100% means you fell short. For example, actual sales of 120 against a target of 100 gives 120%, i.e. 20 percentage points over target." }
    },
    {
      "@type": "Question",
      "name": "What's the difference between percentage change and percentage points?",
      "acceptedAnswer": { "@type": "Answer", "text": "Percentage change measures relative change (e.g., 20% higher), while percentage points measure the raw difference between two percentages (e.g., going from 20% to 25% is a 5 percentage point change)." }
    },
  ]
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(percentageCalculatorSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <PercentageCalculator />
    </>
  );
}
