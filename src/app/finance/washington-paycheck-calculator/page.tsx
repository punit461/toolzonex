import type { Metadata } from "next";
import PaycheckCalculator from "../../../calculators/paycheck/PaycheckCalculator";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "Washington Paycheck Calculator - Estimate Your Take-Home Pay",
  description: "Free Washington paycheck calculator. Washington has no state income tax — see net pay after federal tax, Social Security, and Medicare.",
  keywords: ["washington paycheck calculator", "washington salary calculator", "washington take home pay", "washington tax calculator", "net pay calculator washington"],
  alternates: { canonical: "/finance/washington-paycheck-calculator" },
  openGraph: {
    title: "Washington Paycheck Calculator - Estimate Your Take-Home Pay | ToolZoneX",
    description: "Free Washington paycheck calculator with 2025 federal tax brackets — Washington has no state income tax.",
    url: `${SITE_URL}/finance/washington-paycheck-calculator`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
};

const calculatorSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Washington Paycheck Calculator",
  "description": "Estimate take-home pay in Washington after federal tax, Social Security, and Medicare.",
  "url": `${SITE_URL}/finance/washington-paycheck-calculator`,
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
      <PaycheckCalculator stateSlug="washington" />
    </>
  );
}
