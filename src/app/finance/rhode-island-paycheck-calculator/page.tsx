import type { Metadata } from "next";
import PaycheckCalculator from "../../../calculators/paycheck/PaycheckCalculator";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "Rhode Island Paycheck Calculator - Estimate Your Take-Home Pay",
  description: "Free Rhode Island paycheck calculator with 2025 state tax brackets. See net pay after federal tax, Rhode Island state tax, Social Security, and Medicare.",
  keywords: ["rhode island paycheck calculator", "rhode island salary calculator", "rhode island take home pay", "rhode island tax calculator", "net pay calculator rhode island"],
  alternates: { canonical: "/finance/rhode-island-paycheck-calculator" },
  openGraph: {
    title: "Rhode Island Paycheck Calculator - Estimate Your Take-Home Pay | ToolZoneX",
    description: "Free Rhode Island paycheck calculator with 2025 federal tax brackets and Rhode Island state tax.",
    url: `${SITE_URL}/finance/rhode-island-paycheck-calculator`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
};

const calculatorSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Rhode Island Paycheck Calculator",
  "description": "Estimate take-home pay in Rhode Island after federal tax, state tax, Social Security, and Medicare.",
  "url": `${SITE_URL}/finance/rhode-island-paycheck-calculator`,
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
      <PaycheckCalculator stateSlug="rhode-island" />
    </>
  );
}
