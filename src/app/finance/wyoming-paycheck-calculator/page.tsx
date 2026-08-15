import type { Metadata } from "next";
import PaycheckCalculator from "../../../calculators/paycheck/PaycheckCalculator";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "Wyoming Paycheck Calculator - Take-Home Pay",
  description: "Free Wyoming paycheck calculator. Wyoming has no state income tax — see net pay after federal tax, Social Security, and Medicare.",
  keywords: ["wyoming paycheck calculator", "wyoming salary calculator", "wyoming take home pay", "wyoming tax calculator", "net pay calculator wyoming"],
  alternates: { canonical: "/finance/wyoming-paycheck-calculator" },
  openGraph: {
    title: "Wyoming Paycheck Calculator - Take-Home Pay | ToolZoneX",
    description: "Free Wyoming paycheck calculator. Wyoming has no state income tax — see net pay after federal tax, Social Security, and Medicare.",
    url: `${SITE_URL}/finance/wyoming-paycheck-calculator`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
};

const calculatorSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Wyoming Paycheck Calculator",
  "description": "Estimate take-home pay in Wyoming after federal tax, Social Security, and Medicare.",
  "url": `${SITE_URL}/finance/wyoming-paycheck-calculator`,
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
      <PaycheckCalculator stateSlug="wyoming" />
    </>
  );
}
