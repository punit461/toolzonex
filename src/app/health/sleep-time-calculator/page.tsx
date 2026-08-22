import type { Metadata } from "next";
import SleepTimeCalculator from "../../../calculators/SleepTimeCalculator";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "Sleep Time Calculator - Sleep Cycle & Bedtime Calculator",
  description: "Calculate the best time to go to sleep or wake up based on 90-minute sleep cycles. Wake up feeling refreshed and energized.",
  keywords: ["sleep time calculator", "sleep cycle calculator", "bedtime calculator", "bed time calculator", "when to sleep", "wake up time", "sleep clock calculator", "sleep calculator time", "sleeping hours calculator", "how many hours of sleep", "hours of sleep calculator"],
  alternates: { canonical: "/health/sleep-time-calculator" },
  openGraph: {
    title: "Sleep Time Calculator - Sleep Cycle & Bedtime Calculator | ToolZoneX",
    description: "Calculate the best time to go to sleep or wake up based on 90-minute sleep cycles.",
    url: `${SITE_URL}/health/sleep-time-calculator`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
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

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Why 90-minute cycles?",
      "acceptedAnswer": { "@type": "Answer", "text": "A full sleep cycle (light sleep, deep sleep, REM) averages about 90 minutes. Waking up at the end of a cycle, rather than in the middle of deep sleep, generally feels less groggy." }
    },
    {
      "@type": "Question",
      "name": "How many hours of sleep is 9pm to 5am?",
      "acceptedAnswer": { "@type": "Answer", "text": "Sleeping from 9:00 PM to 5:00 AM is 8 hours of sleep." }
    },
    {
      "@type": "Question",
      "name": "If I sleep at 10 and wake up at 5, how many hours of sleep is that?",
      "acceptedAnswer": { "@type": "Answer", "text": "Sleeping from 10:00 PM to 5:00 AM is 7 hours of sleep." }
    },
    {
      "@type": "Question",
      "name": "If I sleep at 12 and wake up at 8, how many hours of sleep is that?",
      "acceptedAnswer": { "@type": "Answer", "text": "Sleeping from 12:00 AM (midnight) to 8:00 AM is 8 hours of sleep." }
    },
    {
      "@type": "Question",
      "name": "How many hours of sleep is 10 to 7?",
      "acceptedAnswer": { "@type": "Answer", "text": "Sleeping from 10:00 PM to 7:00 AM is 9 hours of sleep." }
    }
  ]
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(toolSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <SleepTimeCalculator />
    </>
  );
}
