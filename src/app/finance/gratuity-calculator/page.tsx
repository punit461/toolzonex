import type { Metadata } from "next";
import GratuityCalculator from "../../../calculators/GratuityCalculator";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://punit461.github.io/toolzonex';

export const metadata: Metadata = {
  title: "Gratuity Calculator - Calculate Gratuity Amount",
  description: "Free gratuity calculator to calculate your end-of-service gratuity amount. Understand your employee benefits with this accurate calculator.",
  keywords: ["gratuity calculator", "gratuity amount", "end of service gratuity", "employee benefits", "gratuity act", "service gratuity"],
  alternates: { canonical: "/finance/gratuity-calculator" },
  openGraph: {
    title: "Gratuity Calculator - Calculate Gratuity Amount | ToolZoneX",
    description: "Calculate your gratuity amount as an employee.",
    url: `${SITE_URL}/finance/gratuity-calculator`,
    type: "article",
  },
};

const gratuityCalculatorSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Gratuity Calculator",
  "description": "Calculate gratuity amount for employees.",
  "url": `${SITE_URL}/finance/gratuity-calculator`,
  "applicationCategory": "FinanceApplication",
  "operatingSystem": "Web Browser",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "INR" },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(gratuityCalculatorSchema) }}
      />
      <GratuityCalculator />
    </>
  );
}
