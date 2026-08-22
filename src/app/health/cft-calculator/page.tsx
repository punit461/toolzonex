import type { Metadata } from "next";
import CFTCalculator from "../../../calculators/CFTCalculator";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "CFT Calculator - Combat Fitness Test Standards",
  description: "Free CFT calculator to calculate combat fitness test standards. Track your military fitness progress with accurate combat fitness test assessments.",
  keywords: ["CFT calculator", "combat fitness test", "military fitness", "combat fitness standards", "army fitness", "CFT score", "combat test", "cft score table", "cft score chart", "cft score sheet"],
  alternates: { canonical: "/health/cft-calculator" },
  openGraph: {
    title: "CFT Calculator - Combat Fitness Test | ToolZoneX",
    description: "Calculate combat fitness test standards.",
    url: `${SITE_URL}/health/cft-calculator`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
};

const cftCalculatorSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "CFT Calculator",
  "description": "Calculate combat fitness test standards.",
  "url": `${SITE_URL}/health/cft-calculator`,
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
      "name": "Where is the CFT score chart / table?",
      "acceptedAnswer": { "@type": "Answer", "text": "The Standard Benchmarks section on this page is a full CFT score chart, listing the Outstanding, Good, and Average bands for the tactical march, ammo can lifts, 300m shuttle run, and casualty drag." }
    },
    {
      "@type": "Question",
      "name": "How is the CFT different from the PFT?",
      "acceptedAnswer": { "@type": "Answer", "text": "The PFT measures general fitness (running, push-ups, sit-ups), while the CFT tests combat-specific tasks under load — tactical marching, lifting, sprinting, and casualty drags — closer to real operational demands." }
    }
  ]
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(cftCalculatorSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <CFTCalculator />
    </>
  );
}
