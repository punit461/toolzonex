import type { Metadata } from "next";
import BMICalculator from "../../../calculators/BMICalculator";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://punit461.github.io/toolzonex';

export const metadata: Metadata = {
  title: "BMI Calculator - Body Mass Index with Indian Guidelines",
  description: "Free BMI calculator to calculate Body Mass Index using WHO and Indian BMI standards. Get personalized health insights based on your body mass index.",
  keywords: ["BMI calculator", "body mass index", "BMI Indian standards", "weight calculator", "health calculator", "BMI check", "obesity calculator"],
  alternates: { canonical: "/health/bmi-calculator" },
  openGraph: {
    title: "BMI Calculator - Body Mass Index with Indian Guidelines | ToolZoneX",
    description: "Calculate BMI using WHO and Indian BMI standards.",
    url: `${SITE_URL}/health/bmi-calculator`,
    type: "article",
  },
};

const bmiCalculatorSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "BMI Calculator",
  "description": "Calculate Body Mass Index with Indian guidelines.",
  "url": `${SITE_URL}/health/bmi-calculator`,
  "applicationCategory": "HealthApplication",
  "operatingSystem": "Web Browser",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "INR" },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(bmiCalculatorSchema) }}
      />
      <BMICalculator />
    </>
  );
}
