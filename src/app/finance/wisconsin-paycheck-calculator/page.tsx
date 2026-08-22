import type { Metadata } from "next";
import PaycheckCalculator from "../../../calculators/paycheck/PaycheckCalculator";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "Wisconsin Paycheck Calculator - Estimate Your Take-Home Pay",
  description: "Free Wisconsin paycheck calculator with 2025 state tax brackets. See net pay after federal tax, Wisconsin state tax, Social Security, and Medicare.",
  keywords: ["wisconsin paycheck calculator", "wisconsin salary calculator", "wisconsin take home pay", "wisconsin tax calculator", "net pay calculator wisconsin"],
  alternates: { canonical: "/finance/wisconsin-paycheck-calculator" },
  openGraph: {
    title: "Wisconsin Paycheck Calculator - Estimate Your Take-Home Pay | ToolZoneX",
    description: "Free Wisconsin paycheck calculator with 2025 federal tax brackets and Wisconsin state tax.",
    url: `${SITE_URL}/finance/wisconsin-paycheck-calculator`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
};

const calculatorSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Wisconsin Paycheck Calculator",
  "description": "Estimate take-home pay in Wisconsin after federal tax, state tax, Social Security, and Medicare.",
  "url": `${SITE_URL}/finance/wisconsin-paycheck-calculator`,
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
      <PaycheckCalculator stateSlug="wisconsin" />
    </>
  );
}
