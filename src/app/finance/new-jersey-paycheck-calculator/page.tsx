import type { Metadata } from "next";
import PaycheckCalculator from "../../../calculators/paycheck/PaycheckCalculator";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "New Jersey Paycheck Calculator - Estimate Your Take-Home Pay",
  description: "Free New Jersey paycheck calculator with 2025 state tax brackets. See net pay after federal tax, New Jersey state tax, Social Security, and Medicare.",
  keywords: ["new jersey paycheck calculator", "new jersey salary calculator", "new jersey take home pay", "new jersey tax calculator", "net pay calculator new jersey"],
  alternates: { canonical: "/finance/new-jersey-paycheck-calculator" },
  openGraph: {
    title: "New Jersey Paycheck Calculator - Estimate Your Take-Home Pay | ToolZoneX",
    description: "Free New Jersey paycheck calculator with 2025 federal tax brackets and New Jersey state tax.",
    url: `${SITE_URL}/finance/new-jersey-paycheck-calculator`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
};

const calculatorSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "New Jersey Paycheck Calculator",
  "description": "Estimate take-home pay in New Jersey after federal tax, state tax, Social Security, and Medicare.",
  "url": `${SITE_URL}/finance/new-jersey-paycheck-calculator`,
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
      <PaycheckCalculator stateSlug="new-jersey" />
    </>
  );
}
