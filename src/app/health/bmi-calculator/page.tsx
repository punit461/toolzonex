import type { Metadata } from "next";
import BMICalculator from "../../../calculators/BMICalculator";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "BMI Calculator - Body Mass Index with Indian Guidelines",
  description: "Free BMI calculator to calculate Body Mass Index using WHO and Indian BMI standards. Get personalized health insights based on your body mass index.",
  keywords: ["BMI calculator", "body mass index", "BMI Indian standards", "weight calculator", "health calculator", "BMI check", "obesity calculator", "bmi calculator india", "bmi calculator for indians", "indian bmi chart", "asian bmi classification"],
  alternates: { canonical: "/health/bmi-calculator" },
  openGraph: {
    title: "BMI Calculator - Body Mass Index with Indian Guidelines | ToolZoneX",
    description: "Calculate BMI using WHO and Indian BMI standards.",
    url: `${SITE_URL}/health/bmi-calculator`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
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

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Is this a BMI calculator for India?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes — this calculator uses the lower Indian/Asian BMI classification thresholds (Underweight below 18.5, Normal 18.5-22.9, Overweight 23-24.9, Obese 25 and above) by default, rather than the standard WHO global cutoffs. It still works for anyone anywhere in the world — just enter your height and weight in metric or imperial units." }
    },
    {
      "@type": "Question",
      "name": "What's a healthy BMI range?",
      "acceptedAnswer": { "@type": "Answer", "text": "For the Indian BMI chart, 18.5-22.9 is considered normal — slightly lower than the WHO's global standard of 18.5-24.9, reflecting a higher health risk at lower BMI levels in South Asian populations." }
    }
  ]
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(bmiCalculatorSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <BMICalculator />
    </>
  );
}
