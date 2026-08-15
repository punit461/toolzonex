import type { Metadata } from "next";
import PaycheckCalculator from "../../../calculators/paycheck/PaycheckCalculator";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "Massachusetts Paycheck Calculator - Take-Home Pay",
  description: "Free Massachusetts paycheck calculator. See net pay after federal tax, state tax, Social Security, and Medicare.",
  keywords: ["massachusetts paycheck calculator", "massachusetts salary calculator", "massachusetts take home pay", "massachusetts tax calculator", "net pay calculator massachusetts"],
  alternates: { canonical: "/finance/massachusetts-paycheck-calculator" },
  openGraph: {
    title: "Massachusetts Paycheck Calculator - Take-Home Pay | ToolZoneX",
    description: "Free Massachusetts paycheck calculator. See net pay after federal tax, state tax, Social Security, and Medicare.",
    url: `${SITE_URL}/finance/massachusetts-paycheck-calculator`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
};

const calculatorSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Massachusetts Paycheck Calculator",
  "description": "Estimate take-home pay in Massachusetts after federal tax, Social Security, and Medicare.",
  "url": `${SITE_URL}/finance/massachusetts-paycheck-calculator`,
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
      <PaycheckCalculator stateSlug="massachusetts" />
    </>
  );
}
