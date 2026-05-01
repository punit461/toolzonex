import type { Metadata } from "next";
import PPFCalculator from "../../../calculators/PPFCalculator";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://punit461.github.io/toolzonex';

export const metadata: Metadata = {
  title: "PPF Calculator - Public Provident Fund Returns",
  description: "Free PPF calculator to calculate Public Provident Fund maturity amount and interest earned. Plan your PPF investments for tax-free returns.",
  keywords: ["PPF calculator", "Public Provident Fund", "PPF returns", "PPF maturity", "PPF interest", "tax-free returns", "PPF investment"],
  alternates: { canonical: "/finance/ppf-calculator" },
  openGraph: {
    title: "PPF Calculator - Public Provident Fund Returns | ToolZoneX",
    description: "Calculate PPF maturity amount and interest earned.",
    url: `${SITE_URL}/finance/ppf-calculator`,
    type: "article",
  },
};

const ppfCalculatorSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "PPF Calculator",
  "description": "Calculate PPF maturity with compounding.",
  "url": `${SITE_URL}/finance/ppf-calculator`,
  "applicationCategory": "FinanceApplication",
  "operatingSystem": "Web Browser",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "INR" },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ppfCalculatorSchema) }}
      />
      <PPFCalculator />
    </>
  );
}
