import type { Metadata } from "next";
import PaycheckCalculator from "../../../calculators/paycheck/PaycheckCalculator";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "Alabama Paycheck Calculator - Estimate Your Take-Home Pay",
  description: "Free Alabama paycheck calculator with 2025 state tax brackets. See net pay after federal tax, Alabama state tax, Social Security, and Medicare.",
  keywords: ["alabama paycheck calculator", "alabama salary calculator", "alabama take home pay", "alabama tax calculator", "net pay calculator alabama"],
  alternates: { canonical: "/finance/alabama-paycheck-calculator" },
  openGraph: {
    title: "Alabama Paycheck Calculator - Estimate Your Take-Home Pay | ToolZoneX",
    description: "Free Alabama paycheck calculator with 2025 federal tax brackets and Alabama state tax.",
    url: `${SITE_URL}/finance/alabama-paycheck-calculator`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
};

const calculatorSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Alabama Paycheck Calculator",
  "description": "Estimate take-home pay in Alabama after federal tax, state tax, Social Security, and Medicare.",
  "url": `${SITE_URL}/finance/alabama-paycheck-calculator`,
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
      <PaycheckCalculator stateSlug="alabama" />
    </>
  );
}
