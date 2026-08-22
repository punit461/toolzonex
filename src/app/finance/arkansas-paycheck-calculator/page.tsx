import type { Metadata } from "next";
import PaycheckCalculator from "../../../calculators/paycheck/PaycheckCalculator";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "Arkansas Paycheck Calculator - Estimate Your Take-Home Pay",
  description: "Free Arkansas paycheck calculator with 2025 state tax brackets. See net pay after federal tax, Arkansas state tax, Social Security, and Medicare.",
  keywords: ["arkansas paycheck calculator", "arkansas salary calculator", "arkansas take home pay", "arkansas tax calculator", "net pay calculator arkansas"],
  alternates: { canonical: "/finance/arkansas-paycheck-calculator" },
  openGraph: {
    title: "Arkansas Paycheck Calculator - Estimate Your Take-Home Pay | ToolZoneX",
    description: "Free Arkansas paycheck calculator with 2025 federal tax brackets and Arkansas state tax.",
    url: `${SITE_URL}/finance/arkansas-paycheck-calculator`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
};

const calculatorSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Arkansas Paycheck Calculator",
  "description": "Estimate take-home pay in Arkansas after federal tax, state tax, Social Security, and Medicare.",
  "url": `${SITE_URL}/finance/arkansas-paycheck-calculator`,
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
      <PaycheckCalculator stateSlug="arkansas" />
    </>
  );
}
