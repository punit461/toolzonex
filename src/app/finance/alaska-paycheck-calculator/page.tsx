import type { Metadata } from "next";
import PaycheckCalculator from "../../../calculators/paycheck/PaycheckCalculator";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "Alaska Paycheck Calculator - Take-Home Pay",
  description: "Free Alaska paycheck calculator. Alaska has no state income tax — see net pay after federal tax, Social Security, and Medicare.",
  keywords: ["alaska paycheck calculator", "alaska salary calculator", "alaska take home pay", "alaska tax calculator", "net pay calculator alaska"],
  alternates: { canonical: "/finance/alaska-paycheck-calculator" },
  openGraph: {
    title: "Alaska Paycheck Calculator - Take-Home Pay | ToolZoneX",
    description: "Free Alaska paycheck calculator. Alaska has no state income tax — see net pay after federal tax, Social Security, and Medicare.",
    url: `${SITE_URL}/finance/alaska-paycheck-calculator`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
};

const calculatorSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Alaska Paycheck Calculator",
  "description": "Estimate take-home pay in Alaska after federal tax, Social Security, and Medicare.",
  "url": `${SITE_URL}/finance/alaska-paycheck-calculator`,
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
      <PaycheckCalculator stateSlug="alaska" />
    </>
  );
}
