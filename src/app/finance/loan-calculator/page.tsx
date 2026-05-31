import type { Metadata } from "next";
import LoanCalculator from "../../../calculators/LoanCalculator";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://punit461.github.io/toolzonex';

export const metadata: Metadata = {
  title: "Loan Calculator - EMI & Mortgage Calculator",
  description: "Calculate your monthly EMI, total interest, and total payment amount for personal loans and mortgages.",
  keywords: ["loan calculator", "emi calculator", "mortgage calculator", "personal loan calculator", "car loan calculator"],
  alternates: { canonical: "/finance/loan-calculator" },
  openGraph: {
    title: "Loan Calculator - EMI & Mortgage Calculator | ToolZoneX",
    description: "Calculate your monthly EMI, total interest, and total payment amount for personal loans and mortgages.",
    url: `${SITE_URL}/finance/loan-calculator`,
    type: "article",
  },
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Loan Calculator",
  "description": "Calculate your monthly EMI, total interest, and total payment amount for personal loans and mortgages.",
  "url": `${SITE_URL}/finance/loan-calculator`,
  "applicationCategory": "FinanceApplication",
  "operatingSystem": "Web Browser",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "INR" },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(toolSchema) }}
      />
      <LoanCalculator />
    </>
  );
}
