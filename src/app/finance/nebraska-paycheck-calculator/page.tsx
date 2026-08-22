import type { Metadata } from "next";
import PaycheckCalculator from "../../../calculators/paycheck/PaycheckCalculator";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "Nebraska Paycheck Calculator - Estimate Your Take-Home Pay",
  description: "Free Nebraska paycheck calculator with 2025 state tax brackets. See net pay after federal tax, Nebraska state tax, Social Security, and Medicare.",
  keywords: ["nebraska paycheck calculator", "nebraska salary calculator", "nebraska take home pay", "nebraska tax calculator", "net pay calculator nebraska"],
  alternates: { canonical: "/finance/nebraska-paycheck-calculator" },
  openGraph: {
    title: "Nebraska Paycheck Calculator - Estimate Your Take-Home Pay | ToolZoneX",
    description: "Free Nebraska paycheck calculator with 2025 federal tax brackets and Nebraska state tax.",
    url: `${SITE_URL}/finance/nebraska-paycheck-calculator`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
};

const calculatorSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Nebraska Paycheck Calculator",
  "description": "Estimate take-home pay in Nebraska after federal tax, state tax, Social Security, and Medicare.",
  "url": `${SITE_URL}/finance/nebraska-paycheck-calculator`,
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
      <PaycheckCalculator stateSlug="nebraska" />
    </>
  );
}
