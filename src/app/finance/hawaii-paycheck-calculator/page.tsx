import type { Metadata } from "next";
import PaycheckCalculator from "../../../calculators/paycheck/PaycheckCalculator";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "Hawaii Paycheck Calculator - Estimate Your Take-Home Pay",
  description: "Free Hawaii paycheck calculator with 2025 state tax brackets. See net pay after federal tax, Hawaii state tax, Social Security, and Medicare.",
  keywords: ["hawaii paycheck calculator", "hawaii salary calculator", "hawaii take home pay", "hawaii tax calculator", "net pay calculator hawaii"],
  alternates: { canonical: "/finance/hawaii-paycheck-calculator" },
  openGraph: {
    title: "Hawaii Paycheck Calculator - Estimate Your Take-Home Pay | ToolZoneX",
    description: "Free Hawaii paycheck calculator with 2025 federal tax brackets and Hawaii state tax.",
    url: `${SITE_URL}/finance/hawaii-paycheck-calculator`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
};

const calculatorSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Hawaii Paycheck Calculator",
  "description": "Estimate take-home pay in Hawaii after federal tax, state tax, Social Security, and Medicare.",
  "url": `${SITE_URL}/finance/hawaii-paycheck-calculator`,
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
      <PaycheckCalculator stateSlug="hawaii" />
    </>
  );
}
