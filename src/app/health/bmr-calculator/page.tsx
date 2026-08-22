import type { Metadata } from "next";
import BMRCalculator from "../../../calculators/health/BMRCalculator";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "BMR Calculator - Basal Metabolic Rate using Mifflin-St Jeor",
  description: "Free BMR calculator to calculate Basal Metabolic Rate using Mifflin-St Jeor equation. Understand your body's calorie needs at rest for effective diet planning.",
  keywords: ["BMR calculator", "basal metabolic rate", "Mifflin-St Jeor", "metabolism", "calorie needs", "BMR formula", "metabolic rate", "mifflin st jeor calculator", "mifflin st jeor equation calculator", "mifflin equation calculator", "mifflin st jeor bmr calculator", "mifflin-st jeor bmr calculator", "mifflin-st. jeor equation calculator", "mifflin st. jeor equation calculator", "mifflin st jeor calorie calculator", "msj equation", "bmr calculator mifflin st jeor", "bmr calculator guide", "total daily energy expenditure"],
  alternates: { canonical: "/health/bmr-calculator" },
  openGraph: {
    title: "BMR Calculator - Basal Metabolic Rate | ToolZoneX",
    description: "Calculate BMR using Mifflin-St Jeor equation.",
    url: `${SITE_URL}/health/bmr-calculator`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
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

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Is BMR the same as the calories I burn in a day?",
      "acceptedAnswer": { "@type": "Answer", "text": "No — BMR is calories burned at complete rest. Your total daily burn (TDEE) is higher and includes activity, exercise, and digestion." }
    },
    {
      "@type": "Question",
      "name": "Is this a Mifflin-St Jeor calculator?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes — every result on this page is computed with the Mifflin-St Jeor equation rather than the older (less accurate) Harris-Benedict formula." }
    },
    {
      "@type": "Question",
      "name": "What is the Mifflin-St Jeor equation?",
      "acceptedAnswer": { "@type": "Answer", "text": "The Mifflin-St Jeor equation is the most widely used formula for estimating BMR. For men: BMR = 10 × weight(kg) + 6.25 × height(cm) - 5 × age(years) + 5. For women: BMR = 10 × weight(kg) + 6.25 × height(cm) - 5 × age(years) - 161. It replaced the older Harris-Benedict equation as the modern clinical standard because it more closely matches measured resting energy expenditure." }
    },
    {
      "@type": "Question",
      "name": "How does BMR relate to TDEE (Total Daily Energy Expenditure)?",
      "acceptedAnswer": { "@type": "Answer", "text": "TDEE = BMR × activity multiplier. Your BMR (Mifflin-St Jeor result) is the calories you'd burn lying still all day; TDEE adds in movement, exercise, and daily activity on top of that. Use our TDEE calculator to apply an activity multiplier to the BMR figure from this page." }
    }
  ]
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(bmrCalculatorSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <BMRCalculator />
    </>
  );
}
