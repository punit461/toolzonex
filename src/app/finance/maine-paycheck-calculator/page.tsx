import type { Metadata } from "next";
import PaycheckCalculator from "../../../calculators/paycheck/PaycheckCalculator";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "Maine Paycheck Calculator - Estimate Your Take-Home Pay",
  description: "Free Maine paycheck calculator with 2025 state tax brackets. See net pay after federal tax, Maine state tax, Social Security, and Medicare.",
  keywords: ["maine paycheck calculator", "maine salary calculator", "maine take home pay", "maine tax calculator", "net pay calculator maine"],
  alternates: { canonical: "/finance/maine-paycheck-calculator" },
  openGraph: {
    title: "Maine Paycheck Calculator - Estimate Your Take-Home Pay | ToolZoneX",
    description: "Free Maine paycheck calculator with 2025 federal tax brackets and Maine state tax.",
    url: `${SITE_URL}/finance/maine-paycheck-calculator`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
};

const calculatorSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Maine Paycheck Calculator",
  "description": "Estimate take-home pay in Maine after federal tax, state tax, Social Security, and Medicare.",
  "url": `${SITE_URL}/finance/maine-paycheck-calculator`,
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
      <PaycheckCalculator stateSlug="maine" />
    </>
  );
}
