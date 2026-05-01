import type { Metadata } from "next";
import IncomeTaxCalculator from "../../../calculators/IncomeTaxCalculator";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://punit461.github.io/toolzonex';

export const metadata: Metadata = {
  title: "Income Tax Calculator - Old vs New Tax Regime FY 2025-26",
  description: "Free income tax calculator to compare tax liability under old and new tax regimes. Calculate income tax for FY 2025-26 with latest slabs and deductions.",
  keywords: ["income tax calculator", "tax regime", "old vs new tax regime", "income tax FY 2025-26", "tax slabs", "tax deduction", "India income tax"],
  alternates: { canonical: "/finance/income-tax-calculator" },
  openGraph: {
    title: "Income Tax Calculator - Old vs New Tax Regime FY 2025-26 | ToolZoneX",
    description: "Compare tax liability under old and new tax regimes for FY 2025-26.",
    url: `${SITE_URL}/finance/income-tax-calculator`,
    type: "article",
  },
};

const incomeTaxCalculatorSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Income Tax Calculator",
  "description": "Compare tax liability under old and new tax regimes.",
  "url": `${SITE_URL}/finance/income-tax-calculator`,
  "applicationCategory": "FinanceApplication",
  "operatingSystem": "Web Browser",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "INR" },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(incomeTaxCalculatorSchema) }}
      />
      <IncomeTaxCalculator />
    </>
  );
}
