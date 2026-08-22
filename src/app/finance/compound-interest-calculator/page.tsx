import type { Metadata } from "next";
import CompoundInterestCalculator from "../../../calculators/CompoundInterestCalculator";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "Compound Interest Calculator - Power of Compounding",
  description: "Free compound interest calculator to see how a lump-sum investment grows with the power of compounding. Choose annual, quarterly, monthly, or daily compounding.",
  keywords: ["compound interest calculator", "power of compounding", "power compounding", "compounding calculator", "interest on interest", "lump sum investment calculator"],
  alternates: { canonical: "/finance/compound-interest-calculator" },
  openGraph: {
    title: "Compound Interest Calculator - Power of Compounding | ToolZoneX",
    description: "See how a lump-sum investment grows with the power of compounding at any compounding frequency.",
    url: `${SITE_URL}/finance/compound-interest-calculator`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
};

const compoundInterestSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Compound Interest Calculator",
  "description": "Calculate how a lump-sum investment grows with the power of compounding.",
  "url": `${SITE_URL}/finance/compound-interest-calculator`,
  "applicationCategory": "FinanceApplication",
  "operatingSystem": "Web Browser",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "INR" },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Does compounding frequency really make a big difference?",
      "acceptedAnswer": { "@type": "Answer", "text": "At the same nominal rate, more frequent compounding (e.g. monthly vs. annually) produces a slightly higher return, but the difference is modest — the bigger levers are the rate itself and how long the money stays invested." }
    },
    {
      "@type": "Question",
      "name": "Is this the same as a SIP calculator?",
      "acceptedAnswer": { "@type": "Answer", "text": "No — this tool models a single lump-sum investment. For regular monthly contributions, use the SIP Calculator instead." }
    }
  ]
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(compoundInterestSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <CompoundInterestCalculator />
    </>
  );
}
