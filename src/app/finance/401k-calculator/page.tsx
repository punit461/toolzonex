import type { Metadata } from "next";
import US401kCalculator from "../../../calculators/US401kCalculator";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "401(k) Calculator - Project Your Retirement Balance",
  description: "Free 401(k) retirement calculator with employer match and 2026 IRS contribution limits. Project your balance at retirement with a year-by-year growth chart.",
  keywords: ["401k calculator", "retirement calculator", "401k contribution limit 2026", "employer match calculator", "retirement savings calculator", "401k projection"],
  alternates: { canonical: "/finance/401k-calculator" },
  openGraph: {
    title: "401(k) Calculator - Project Your Retirement Balance | ToolZoneX",
    description: "Free 401(k) retirement calculator with employer match and 2026 IRS contribution limits.",
    url: `${SITE_URL}/finance/401k-calculator`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
};

const calculatorSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "401(k) Retirement Calculator",
  "description": "Project your 401(k) balance at retirement, including employer match and IRS contribution limits.",
  "url": `${SITE_URL}/finance/401k-calculator`,
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
      <US401kCalculator />
    </>
  );
}
