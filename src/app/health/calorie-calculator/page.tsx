import type { Metadata } from "next";
import CalorieCalculator from "../../../calculators/CalorieCalculator";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://punit461.github.io/toolzonex';

export const metadata: Metadata = {
  title: "Calorie Calculator - Daily Calorie Needs",
  description: "Calculate your daily calorie needs for weight loss, maintenance, or muscle gain using the accurate Mifflin-St Jeor equation.",
  keywords: ["calorie calculator", "daily calories", "weight loss calories", "maintenance calories", "tdee calculator"],
  alternates: { canonical: "/health/calorie-calculator" },
  openGraph: {
    title: "Calorie Calculator - Daily Calorie Needs | ToolZoneX",
    description: "Calculate your daily calorie needs for weight loss, maintenance, or muscle gain.",
    url: `${SITE_URL}/health/calorie-calculator`,
    type: "article",
  },
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Calorie Calculator",
  "description": "Calculate your daily calorie needs for weight loss, maintenance, or muscle gain.",
  "url": `${SITE_URL}/health/calorie-calculator`,
  "applicationCategory": "HealthApplication",
  "operatingSystem": "Web Browser",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "INR" },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(toolSchema) }}
      />
      <CalorieCalculator />
    </>
  );
}
