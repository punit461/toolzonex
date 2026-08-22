import type { Metadata } from "next";
import USMortgageCalculator from "../../../calculators/USMortgageCalculator";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "US Mortgage Calculator - Monthly Payment (PITI) & Amortization",
  description: "Free US mortgage calculator with property tax, home insurance, PMI, and HOA. See your full monthly payment (PITI) and a year-by-year amortization chart.",
  keywords: ["mortgage calculator", "US mortgage calculator", "PITI calculator", "monthly mortgage payment", "amortization calculator", "PMI calculator", "home loan calculator"],
  alternates: { canonical: "/finance/mortgage-calculator" },
  openGraph: {
    title: "US Mortgage Calculator - Monthly Payment (PITI) & Amortization | ToolZoneX",
    description: "Free US mortgage calculator with property tax, home insurance, PMI, and HOA.",
    url: `${SITE_URL}/finance/mortgage-calculator`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
};

const calculatorSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "US Mortgage Calculator",
  "description": "Estimate your full monthly mortgage payment (PITI) with property tax, insurance, PMI, and a year-by-year amortization chart.",
  "url": `${SITE_URL}/finance/mortgage-calculator`,
  "applicationCategory": "FinanceApplication",
  "operatingSystem": "Web Browser",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(calculatorSchema) }}
      />
      <USMortgageCalculator />
    </>
  );
}
