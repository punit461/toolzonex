import type { Metadata } from "next";
import PaycheckCalculator from "../../../calculators/paycheck/PaycheckCalculator";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "Maryland Paycheck Calculator - Estimate Your Take-Home Pay",
  description: "Free Maryland paycheck calculator with 2025 state tax brackets. See net pay after federal tax, Maryland state tax, Social Security, and Medicare.",
  keywords: ["maryland paycheck calculator", "maryland salary calculator", "maryland take home pay", "maryland tax calculator", "net pay calculator maryland"],
  alternates: { canonical: "/finance/maryland-paycheck-calculator" },
  openGraph: {
    title: "Maryland Paycheck Calculator - Estimate Your Take-Home Pay | ToolZoneX",
    description: "Free Maryland paycheck calculator with 2025 federal tax brackets and Maryland state tax.",
    url: `${SITE_URL}/finance/maryland-paycheck-calculator`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
};

const calculatorSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Maryland Paycheck Calculator",
  "description": "Estimate take-home pay in Maryland after federal tax, state tax, Social Security, and Medicare.",
  "url": `${SITE_URL}/finance/maryland-paycheck-calculator`,
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
      <PaycheckCalculator stateSlug="maryland" />
    </>
  );
}
