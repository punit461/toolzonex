import type { Metadata } from "next";
import PaycheckCalculator from "../../../calculators/paycheck/PaycheckCalculator";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "Montana Paycheck Calculator - Estimate Your Take-Home Pay",
  description: "Free Montana paycheck calculator with 2025 state tax brackets. See net pay after federal tax, Montana state tax, Social Security, and Medicare.",
  keywords: ["montana paycheck calculator", "montana salary calculator", "montana take home pay", "montana tax calculator", "net pay calculator montana"],
  alternates: { canonical: "/finance/montana-paycheck-calculator" },
  openGraph: {
    title: "Montana Paycheck Calculator - Estimate Your Take-Home Pay | ToolZoneX",
    description: "Free Montana paycheck calculator with 2025 federal tax brackets and Montana state tax.",
    url: `${SITE_URL}/finance/montana-paycheck-calculator`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
};

const calculatorSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Montana Paycheck Calculator",
  "description": "Estimate take-home pay in Montana after federal tax, state tax, Social Security, and Medicare.",
  "url": `${SITE_URL}/finance/montana-paycheck-calculator`,
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
      <PaycheckCalculator stateSlug="montana" />
    </>
  );
}
