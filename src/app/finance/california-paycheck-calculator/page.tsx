import type { Metadata } from "next";
import PaycheckCalculator from "../../../calculators/paycheck/PaycheckCalculator";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "California Paycheck Calculator - Estimate Your Take-Home Pay",
  description: "Free California paycheck calculator. See net pay after federal tax, state tax, Social Security, and Medicare, by pay period.",
  keywords: ["california paycheck calculator", "california salary calculator", "california take home pay", "california tax calculator", "net pay calculator california"],
  alternates: { canonical: "/finance/california-paycheck-calculator" },
  openGraph: {
    title: "California Paycheck Calculator - Estimate Your Take-Home Pay | ToolZoneX",
    description: "Free California paycheck calculator with 2025 federal and California state tax brackets.",
    url: `${SITE_URL}/finance/california-paycheck-calculator`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
};

const calculatorSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "California Paycheck Calculator",
  "description": "Estimate take-home pay in California after federal tax, Social Security, and Medicare.",
  "url": `${SITE_URL}/finance/california-paycheck-calculator`,
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
      <PaycheckCalculator stateSlug="california" />
    </>
  );
}
