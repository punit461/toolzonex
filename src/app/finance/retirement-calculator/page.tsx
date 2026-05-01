import type { Metadata } from "next";
import RetirementCalculator from "../../../calculators/RetirementCalculator";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://punit461.github.io/toolzonex';

export const metadata: Metadata = {
  title: "Retirement Calculator - Plan Your Retirement Corpus",
  description: "Free retirement calculator to calculate the corpus needed for retirement and monthly SIP required. Plan for a secure retirement with accurate projections.",
  keywords: ["retirement calculator", "retirement corpus", "retirement planning", "retirement SIP", "retirement savings", "pension planning", "retire early"],
  alternates: { canonical: "/finance/retirement-calculator" },
  openGraph: {
    title: "Retirement Calculator - Plan Your Retirement Corpus | ToolZoneX",
    description: "Calculate retirement corpus and required SIP for secure retirement.",
    url: `${SITE_URL}/finance/retirement-calculator`,
    type: "article",
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

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(retirementCalculatorSchema) }}
      />
      <RetirementCalculator />
    </>
  );
}
