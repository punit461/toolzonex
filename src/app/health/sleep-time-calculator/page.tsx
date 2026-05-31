import type { Metadata } from "next";
import SleepTimeCalculator from "../../../calculators/SleepTimeCalculator";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://punit461.github.io/toolzonex';

export const metadata: Metadata = {
  title: "Sleep Time Calculator - Sleep Cycle & Bedtime Calculator",
  description: "Calculate the best time to go to sleep or wake up based on 90-minute sleep cycles. Wake up feeling refreshed and energized.",
  keywords: ["sleep time calculator", "sleep cycle calculator", "bedtime calculator", "when to sleep", "wake up time"],
  alternates: { canonical: "/health/sleep-time-calculator" },
  openGraph: {
    title: "Sleep Time Calculator - Sleep Cycle & Bedtime Calculator | ToolZoneX",
    description: "Calculate the best time to go to sleep or wake up based on 90-minute sleep cycles.",
    url: `${SITE_URL}/health/sleep-time-calculator`,
    type: "article",
  },
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Sleep Time Calculator",
  "description": "Calculate the best time to go to sleep or wake up based on 90-minute sleep cycles. Wake up feeling refreshed and energized.",
  "url": `${SITE_URL}/health/sleep-time-calculator`,
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
      <SleepTimeCalculator />
    </>
  );
}
