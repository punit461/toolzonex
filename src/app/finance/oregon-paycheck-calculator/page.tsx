import type { Metadata } from "next";
import PaycheckCalculator from "../../../calculators/paycheck/PaycheckCalculator";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "Oregon Paycheck Calculator - Estimate Your Take-Home Pay",
  description: "Free Oregon paycheck calculator with 2025 state tax brackets. See net pay after federal tax, Oregon state tax, Social Security, and Medicare.",
  keywords: ["oregon paycheck calculator", "oregon salary calculator", "oregon take home pay", "oregon tax calculator", "net pay calculator oregon"],
  alternates: { canonical: "/finance/oregon-paycheck-calculator" },
  openGraph: {
    title: "Oregon Paycheck Calculator - Estimate Your Take-Home Pay | ToolZoneX",
    description: "Free Oregon paycheck calculator with 2025 federal tax brackets and Oregon state tax.",
    url: `${SITE_URL}/finance/oregon-paycheck-calculator`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
};

const calculatorSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Oregon Paycheck Calculator",
  "description": "Estimate take-home pay in Oregon after federal tax, state tax, Social Security, and Medicare.",
  "url": `${SITE_URL}/finance/oregon-paycheck-calculator`,
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
      <PaycheckCalculator stateSlug="oregon" />
    </>
  );
}
