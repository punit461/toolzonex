import type { Metadata } from "next";
import SIPCalculator from "../../../calculators/SIPCalculator";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://punit461.github.io/toolzonex';

export const metadata: Metadata = {
  title: "SIP Calculator - Estimate Mutual Fund Returns",
  description: "Free SIP calculator to calculate expected returns on mutual fund investments. Plan your SIP for wealth creation with detailed projections.",
  keywords: ["SIP calculator", "mutual fund calculator", "SIP returns", "systematic investment plan", "SIP investment", "wealth creation"],
  alternates: { canonical: "/finance/sip-calculator" },
  openGraph: {
    title: "SIP Calculator - Estimate Mutual Fund Returns | ToolZoneX",
    description: "Free SIP calculator to calculate expected returns on mutual fund investments.",
    url: `${SITE_URL}/finance/sip-calculator`,
    type: "article",
  },
};

const sipCalculatorSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "SIP Calculator",
  "description": "Calculate expected returns on mutual fund SIP investments.",
  "url": `${SITE_URL}/finance/sip-calculator`,
  "applicationCategory": "FinanceApplication",
  "operatingSystem": "Web Browser",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "INR" },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(sipCalculatorSchema) }}
      />
      <SIPCalculator />
    </>
  );
}
