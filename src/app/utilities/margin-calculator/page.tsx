import type { Metadata } from "next";
import MarginCalculator from "../../../calculators/MarginCalculator";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "Margin Calculator - Calculate Profit Margin & Markup Online",
  description: "Calculate gross profit, profit margin, and markup percentage instantly. Free online margin calculator for businesses.",
  keywords: ["margin calculator", "profit margin calculator", "markup calculator", "gross profit calculator", "margin markup", "margin percentage calculator", "margin vs markup"],
  alternates: { canonical: "/utilities/margin-calculator" },
  openGraph: {
    title: "Margin Calculator - Calculate Profit Margin & Markup Online | ToolZoneX",
    description: "Calculate gross profit, profit margin, and markup percentage instantly.",
    url: `${SITE_URL}/utilities/margin-calculator`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Margin Calculator",
  "description": "Calculate gross profit, profit margin, and markup percentage instantly.",
  "url": `${SITE_URL}/utilities/margin-calculator`,
  "applicationCategory": "BusinessApplication",
  "operatingSystem": "Web Browser",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "INR" },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What's the difference between margin and markup?",
      "acceptedAnswer": { "@type": "Answer", "text": "Margin is profit as a percentage of the selling price (Revenue), while markup is profit as a percentage of the Cost. For the same sale, markup is always a higher number than margin because it's calculated on the smaller cost figure rather than the larger revenue figure — this calculator shows both side by side so you never confuse the two." }
    },
    {
      "@type": "Question",
      "name": "How do I calculate margin percentage?",
      "acceptedAnswer": { "@type": "Answer", "text": "Margin percentage = (Revenue − Cost) ÷ Revenue × 100. Enter your Cost and Revenue above and the Gross Margin field updates automatically — or enter Cost and a target margin to see what Revenue you need to charge." }
    },
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
      <MarginCalculator />
    </>
  );
}
