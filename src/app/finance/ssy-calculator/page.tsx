import type { Metadata } from "next";
import SSYCalculator from "../../../calculators/SSYCalculator";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://punit461.github.io/toolzonex';

export const metadata: Metadata = {
  title: "SSY Calculator - Sukanya Samriddhi Yojana Returns",
  description: "Free SSY calculator to calculate Sukanya Samriddhi Yojana maturity amount. Plan for your daughter's education with this government scheme.",
  keywords: ["SSY calculator", "Sukanya Samriddhi Yojana", "SSY maturity", "SSY interest rate", "daughter marriage planning", "education fund"],
  alternates: { canonical: "/finance/ssy-calculator" },
  openGraph: {
    title: "SSY Calculator - Sukanya Samriddhi Yojana Returns | ToolZoneX",
    description: "Calculate Sukanya Samriddhi Yojana maturity amount.",
    url: `${SITE_URL}/finance/ssy-calculator`,
    type: "article",
  },
};

const ssyCalculatorSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "SSY Calculator",
  "description": "Calculate Sukanya Samriddhi Yojana maturity value.",
  "url": `${SITE_URL}/finance/ssy-calculator`,
  "applicationCategory": "FinanceApplication",
  "operatingSystem": "Web Browser",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "INR" },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ssyCalculatorSchema) }}
      />
      <SSYCalculator />
    </>
  );
}
