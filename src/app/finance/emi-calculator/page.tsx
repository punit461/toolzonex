import type { Metadata } from "next";
import EMICalculator from "../../../calculators/EMICalculator";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://punit461.github.io/toolzonex';

export const metadata: Metadata = {
  title: "EMI Calculator - Calculate Home, Car & Personal Loan EMI",
  description: "Free online EMI calculator to calculate monthly installments for home, car, and personal loans with detailed amortization schedule and interest breakdown.",
  keywords: ["EMI calculator", "loan EMI", "home loan EMI", "car loan EMI", "personal loan EMI", "EMI calculation", "loan calculator India"],
  alternates: { canonical: "/finance/emi-calculator" },
  openGraph: {
    title: "EMI Calculator - Calculate Home, Car & Personal Loan EMI | ToolZoneX",
    description: "Free online EMI calculator to calculate monthly installments for home, car, and personal loans with detailed amortization schedule.",
    url: `${SITE_URL}/finance/emi-calculator`,
    type: "article",
  },
};

const emiCalculatorSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "EMI Calculator",
  "description": "Calculate your monthly EMI for home, car, or personal loans.",
  "url": `${SITE_URL}/finance/emi-calculator`,
  "applicationCategory": "FinanceApplication",
  "operatingSystem": "Web Browser",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "INR" },
  "calculateCost": {
    "@type": "PriceSpecification",
    "priceCurrency": "INR"
  }
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(emiCalculatorSchema) }}
      />
      <EMICalculator />
    </>
  );
}
