import type { Metadata } from "next";
import PFTCalculator from "../../../calculators/health/PFTCalculator";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "PFT Calculator - Physical Fitness Test Assessment",
  description: "Free PFT calculator to assess your physical fitness levels with multiple parameters. Track your fitness journey with comprehensive fitness test assessments.",
  keywords: ["PFT calculator", "physical fitness test", "fitness assessment", "fitness level", "physical fitness", "fitness tracking", "APFT", "pft score sheet", "pft scoring", "pft score chart", "pft score table"],
  alternates: { canonical: "/health/pft-calculator" },
  openGraph: {
    title: "PFT Calculator - Physical Fitness Test | ToolZoneX",
    description: "Assess your physical fitness levels with multiple parameters.",
    url: `${SITE_URL}/health/pft-calculator`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
};

const pftCalculatorSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "PFT Calculator",
  "description": "Assess physical fitness levels with multiple parameters.",
  "url": `${SITE_URL}/health/pft-calculator`,
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
      "name": "Where is the PFT score sheet?",
      "acceptedAnswer": { "@type": "Answer", "text": "The Standard Benchmarks table on this page is the PFT score sheet — it lists the Outstanding, Good, and Average cutoffs for the 1.6km run, 2.4km run, push-ups, and sit-ups. Enter your own times and reps in the calculator above to see which band you land in." }
    },
    {
      "@type": "Question",
      "name": "How does PFT scoring work?",
      "acceptedAnswer": { "@type": "Answer", "text": "Each event — run time, push-up count, sit-up count — is scored independently against fixed thresholds (Outstanding, Good, Average, Below Standard). Your overall PFT grade is set by your weakest event, so a strong run time won't offset a Below Standard push-up count." }
    },
    {
      "@type": "Question",
      "name": "Do all services use the same PFT standards?",
      "acceptedAnswer": { "@type": "Answer", "text": "No — exact distances, time limits, and rep counts vary slightly between the Army, Navy, Air Force, NDA, CDS, and state police recruitment boards. Always check the specific notification for your exam." }
    }
  ]
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pftCalculatorSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <PFTCalculator />
    </>
  );
}
