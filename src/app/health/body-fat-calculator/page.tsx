import type { Metadata } from "next";
import BodyFatCalculator from "../../../calculators/BodyFatCalculator";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "Body Fat Calculator - US Navy Method",
  description: "Estimate your body fat percentage and lean body mass online using the US Navy tape measure method.",
  keywords: ["body fat calculator", "us navy body fat", "calculate body fat", "fat percentage", "lean mass calculator", "us navy body fat calculator accuracy", "is the navy body fat calculator accurate", "navy body fat calculator accuracy", "body fat calculator tape measure", "body fat tape measure calculator", "tape body fat calculator"],
  alternates: { canonical: "/health/body-fat-calculator" },
  openGraph: {
    title: "Body Fat Calculator - US Navy Method | ToolZoneX",
    description: "Estimate your body fat percentage and lean body mass online using the US Navy tape measure method.",
    url: `${SITE_URL}/health/body-fat-calculator`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Body Fat Calculator",
  "description": "Estimate your body fat percentage and lean body mass online using the US Navy tape measure method.",
  "url": `${SITE_URL}/health/body-fat-calculator`,
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
      "name": "How accurate is the US Navy body fat calculator?",
      "acceptedAnswer": { "@type": "Answer", "text": "The US Navy tape-measure method is a reasonable estimate for most people — often within a few percentage points of lab methods like DEXA or hydrostatic weighing — but it is not as precise as those methods. It works by estimating body fat from circumference measurements rather than directly measuring fat tissue, so it can be less accurate for very lean, very muscular, or unusually shaped individuals. It's best used to track trends over time rather than as an exact number." }
    },
    {
      "@type": "Question",
      "name": "Is this a tape measure body fat calculator?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes — this calculator uses the US Navy method, which only requires a flexible tape measure. Enter your neck, waist, height, and (for women) hip measurements to estimate body fat percentage without calipers or a DEXA scan." }
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
      <BodyFatCalculator />
    </>
  );
}
