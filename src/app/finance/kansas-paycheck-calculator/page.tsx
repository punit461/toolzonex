import type { Metadata } from "next";
import PaycheckCalculator from "../../../calculators/paycheck/PaycheckCalculator";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "Kansas Paycheck Calculator - Estimate Your Take-Home Pay",
  description: "Free Kansas paycheck calculator with 2025 state tax brackets. See net pay after federal tax, Kansas state tax, Social Security, and Medicare.",
  keywords: ["kansas paycheck calculator", "kansas salary calculator", "kansas take home pay", "kansas tax calculator", "net pay calculator kansas"],
  alternates: { canonical: "/finance/kansas-paycheck-calculator" },
  openGraph: {
    title: "Kansas Paycheck Calculator - Estimate Your Take-Home Pay | ToolZoneX",
    description: "Free Kansas paycheck calculator with 2025 federal tax brackets and Kansas state tax.",
    url: `${SITE_URL}/finance/kansas-paycheck-calculator`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
};

const calculatorSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Kansas Paycheck Calculator",
  "description": "Estimate take-home pay in Kansas after federal tax, state tax, Social Security, and Medicare.",
  "url": `${SITE_URL}/finance/kansas-paycheck-calculator`,
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
      <PaycheckCalculator stateSlug="kansas" />
    </>
  );
}
