import type { Metadata } from "next";
import PaycheckCalculator from "../../../calculators/paycheck/PaycheckCalculator";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "Vermont Paycheck Calculator - Estimate Your Take-Home Pay",
  description: "Free Vermont paycheck calculator with 2025 state tax brackets. See net pay after federal tax, Vermont state tax, Social Security, and Medicare.",
  keywords: ["vermont paycheck calculator", "vermont salary calculator", "vermont take home pay", "vermont tax calculator", "net pay calculator vermont"],
  alternates: { canonical: "/finance/vermont-paycheck-calculator" },
  openGraph: {
    title: "Vermont Paycheck Calculator - Estimate Your Take-Home Pay | ToolZoneX",
    description: "Free Vermont paycheck calculator with 2025 federal tax brackets and Vermont state tax.",
    url: `${SITE_URL}/finance/vermont-paycheck-calculator`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
};

const calculatorSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Vermont Paycheck Calculator",
  "description": "Estimate take-home pay in Vermont after federal tax, state tax, Social Security, and Medicare.",
  "url": `${SITE_URL}/finance/vermont-paycheck-calculator`,
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
      <PaycheckCalculator stateSlug="vermont" />
    </>
  );
}
