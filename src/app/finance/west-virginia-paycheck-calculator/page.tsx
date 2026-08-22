import type { Metadata } from "next";
import PaycheckCalculator from "../../../calculators/paycheck/PaycheckCalculator";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "West Virginia Paycheck Calculator - Estimate Your Take-Home Pay",
  description: "Free West Virginia paycheck calculator with 2025 state tax brackets. See net pay after federal tax, West Virginia state tax, Social Security, and Medicare.",
  keywords: ["west virginia paycheck calculator", "west virginia salary calculator", "west virginia take home pay", "west virginia tax calculator", "net pay calculator west virginia"],
  alternates: { canonical: "/finance/west-virginia-paycheck-calculator" },
  openGraph: {
    title: "West Virginia Paycheck Calculator - Estimate Your Take-Home Pay | ToolZoneX",
    description: "Free West Virginia paycheck calculator with 2025 federal tax brackets and West Virginia state tax.",
    url: `${SITE_URL}/finance/west-virginia-paycheck-calculator`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
};

const calculatorSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "West Virginia Paycheck Calculator",
  "description": "Estimate take-home pay in West Virginia after federal tax, state tax, Social Security, and Medicare.",
  "url": `${SITE_URL}/finance/west-virginia-paycheck-calculator`,
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
      <PaycheckCalculator stateSlug="west-virginia" />
    </>
  );
}
