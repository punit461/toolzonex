import type { Metadata } from "next";
import TDEECalculator from "../../../calculators/health/TDEECalculator";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

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
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
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

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What does TDEE stand for?",
      "acceptedAnswer": { "@type": "Answer", "text": "TDEE stands for Total Daily Energy Expenditure — the total number of calories your body burns in a full day, combining your resting metabolism (BMR) with all activity, exercise, and digestion." }
    },
    {
      "@type": "Question",
      "name": "How is TDEE different from BMR?",
      "acceptedAnswer": { "@type": "Answer", "text": "BMR is calories burned at complete rest; TDEE (Total Daily Energy Expenditure) adds your activity level on top, giving a more realistic picture of your actual daily calorie burn." }
    }
  ]
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(tdeeCalculatorSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <TDEECalculator />
    </>
  );
}
