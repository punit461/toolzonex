import type { Metadata } from "next";
import PaycheckCalculator from "../../../calculators/paycheck/PaycheckCalculator";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "Oklahoma Paycheck Calculator - Estimate Your Take-Home Pay",
  description: "Free Oklahoma paycheck calculator with 2025 state tax brackets. See net pay after federal tax, Oklahoma state tax, Social Security, and Medicare.",
  keywords: ["oklahoma paycheck calculator", "oklahoma salary calculator", "oklahoma take home pay", "oklahoma tax calculator", "net pay calculator oklahoma"],
  alternates: { canonical: "/finance/oklahoma-paycheck-calculator" },
  openGraph: {
    title: "Oklahoma Paycheck Calculator - Estimate Your Take-Home Pay | ToolZoneX",
    description: "Free Oklahoma paycheck calculator with 2025 federal tax brackets and Oklahoma state tax.",
    url: `${SITE_URL}/finance/oklahoma-paycheck-calculator`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
};

const calculatorSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Oklahoma Paycheck Calculator",
  "description": "Estimate take-home pay in Oklahoma after federal tax, state tax, Social Security, and Medicare.",
  "url": `${SITE_URL}/finance/oklahoma-paycheck-calculator`,
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
      <PaycheckCalculator stateSlug="oklahoma" />
    </>
  );
}
