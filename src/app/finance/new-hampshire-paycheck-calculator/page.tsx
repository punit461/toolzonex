import type { Metadata } from "next";
import PaycheckCalculator from "../../../calculators/paycheck/PaycheckCalculator";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "New Hampshire Paycheck Calculator - Take-Home Pay",
  description: "Free New Hampshire paycheck calculator. New Hampshire has no state income tax — see net pay after federal tax, Social Security, and Medicare.",
  keywords: ["new hampshire paycheck calculator", "new hampshire salary calculator", "new hampshire take home pay", "new hampshire tax calculator", "net pay calculator new hampshire"],
  alternates: { canonical: "/finance/new-hampshire-paycheck-calculator" },
  openGraph: {
    title: "New Hampshire Paycheck Calculator - Take-Home Pay | ToolZoneX",
    description: "Free New Hampshire paycheck calculator. New Hampshire has no state income tax — see net pay after federal tax, Social Security, and Medicare.",
    url: `${SITE_URL}/finance/new-hampshire-paycheck-calculator`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
};

const calculatorSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "New Hampshire Paycheck Calculator",
  "description": "Estimate take-home pay in New Hampshire after federal tax, Social Security, and Medicare.",
  "url": `${SITE_URL}/finance/new-hampshire-paycheck-calculator`,
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
      <PaycheckCalculator stateSlug="new-hampshire" />
    </>
  );
}
