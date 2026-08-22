import type { Metadata } from "next";
import RetirementCalculator from "../../../calculators/finance/RetirementCalculator";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "Retirement Calculator - Plan Your Retirement Corpus",
  description: "Free retirement calculator to calculate the corpus needed for retirement and monthly SIP required. Plan for a secure retirement with accurate projections.",
  keywords: ["retirement calculator", "retirement corpus", "retirement planning", "retirement SIP", "retirement savings", "pension planning", "retire early", "when i can retire calculator", "calculating retirement needs", "how much i need to retire"],
  alternates: { canonical: "/finance/retirement-calculator" },
  openGraph: {
    title: "Retirement Calculator - Plan Your Retirement Corpus | ToolZoneX",
    description: "Calculate retirement corpus and required SIP for secure retirement.",
    url: `${SITE_URL}/finance/retirement-calculator`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
};

const retirementCalculatorSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Retirement Calculator",
  "description": "Calculate retirement corpus and required SIP.",
  "url": `${SITE_URL}/finance/retirement-calculator`,
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
      "name": "How do I calculate when I can retire?",
      "acceptedAnswer": { "@type": "Answer", "text": "Enter your current age, target retirement age, and current monthly expenses, and this calculator projects the retirement corpus you'll need at that age (accounting for inflation) alongside the monthly SIP required to reach it from your existing savings. If the required monthly SIP looks unaffordable, try pushing the retirement age later or trimming projected expenses to see when the numbers become realistic." }
    },
    {
      "@type": "Question",
      "name": "How do I calculate my retirement needs?",
      "acceptedAnswer": { "@type": "Answer", "text": "Retirement needs are calculated by inflating your current monthly expenses forward to your retirement age, then working out how large a corpus is needed so that corpus (invested at a safer post-retirement return) can cover those inflated expenses for the rest of your expected lifespan. This calculator does that math automatically from the inputs above." }
    },
    {
      "@type": "Question",
      "name": "How much money do I need to retire?",
      "acceptedAnswer": { "@type": "Answer", "text": "It depends on your current expenses, years until retirement, inflation, and how long retirement needs to last — there's no single number that applies to everyone. Use the 'Retirement Corpus Needed' figure above as your personalized estimate based on the details you enter." }
    },
  ]
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(retirementCalculatorSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <RetirementCalculator />
    </>
  );
}
