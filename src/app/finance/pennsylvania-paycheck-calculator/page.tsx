import type { Metadata } from "next";
import PaycheckCalculator from "../../../calculators/paycheck/PaycheckCalculator";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "Pennsylvania Paycheck Calculator - Take-Home Pay",
  description: "Free Pennsylvania paycheck calculator. See net pay after federal tax, state tax, Social Security, and Medicare.",
  keywords: ["pennsylvania paycheck calculator", "pennsylvania salary calculator", "pennsylvania take home pay", "pennsylvania tax calculator", "net pay calculator pennsylvania"],
  alternates: { canonical: "/finance/pennsylvania-paycheck-calculator" },
  openGraph: {
    title: "Pennsylvania Paycheck Calculator - Take-Home Pay | ToolZoneX",
    description: "Free Pennsylvania paycheck calculator. See net pay after federal tax, state tax, Social Security, and Medicare.",
    url: `${SITE_URL}/finance/pennsylvania-paycheck-calculator`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
};

const calculatorSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Pennsylvania Paycheck Calculator",
  "description": "Estimate take-home pay in Pennsylvania after federal tax, Social Security, and Medicare.",
  "url": `${SITE_URL}/finance/pennsylvania-paycheck-calculator`,
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
      <PaycheckCalculator stateSlug="pennsylvania" />
    </>
  );
}
