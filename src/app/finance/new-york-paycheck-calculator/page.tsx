import type { Metadata } from "next";
import PaycheckCalculator from "../../../calculators/paycheck/PaycheckCalculator";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "New York Paycheck Calculator - Estimate Your Take-Home Pay",
  description: "Free New York paycheck calculator. See net pay after federal tax, NY state tax, Social Security, and Medicare, by pay period.",
  keywords: ["new york paycheck calculator", "new york salary calculator", "new york take home pay", "new york tax calculator", "net pay calculator new york"],
  alternates: { canonical: "/finance/new-york-paycheck-calculator" },
  openGraph: {
    title: "New York Paycheck Calculator - Estimate Your Take-Home Pay | ToolZoneX",
    description: "Free New York paycheck calculator with 2025 federal and New York state tax brackets.",
    url: `${SITE_URL}/finance/new-york-paycheck-calculator`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
};

const calculatorSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "New York Paycheck Calculator",
  "description": "Estimate take-home pay in New York after federal tax, Social Security, and Medicare.",
  "url": `${SITE_URL}/finance/new-york-paycheck-calculator`,
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
      <PaycheckCalculator stateSlug="new-york" />
    </>
  );
}
