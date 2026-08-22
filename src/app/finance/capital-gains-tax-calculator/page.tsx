import type { Metadata } from "next";
import CapitalGainsTaxCalculator from "../../../calculators/finance/CapitalGainsTaxCalculator";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "Capital Gains Tax Calculator - Short & Long-Term, by State",
  description: "Free capital gains tax calculator. Estimate federal, NIIT, and state tax on a short-term or long-term capital gain using 2026 IRS brackets.",
  keywords: ["capital gains tax calculator", "long term capital gains calculator", "short term capital gains tax", "capital gains tax by state", "niit calculator", "2026 capital gains brackets"],
  alternates: { canonical: "/finance/capital-gains-tax-calculator" },
  openGraph: {
    title: "Capital Gains Tax Calculator | ToolZoneX",
    description: "Estimate federal, NIIT, and state tax on a short-term or long-term capital gain using 2026 brackets.",
    url: `${SITE_URL}/finance/capital-gains-tax-calculator`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
};

const calculatorSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Capital Gains Tax Calculator",
  "description": "Estimate federal, NIIT, and state tax on a short-term or long-term capital gain using 2026 brackets.",
  "url": `${SITE_URL}/finance/capital-gains-tax-calculator`,
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
      <CapitalGainsTaxCalculator />
    </>
  );
}
