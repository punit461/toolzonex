import type { Metadata } from "next";
import PaycheckCalculator from "../../../calculators/paycheck/PaycheckCalculator";
import { STATE_SEO_CONTENT } from "../../../calculators/paycheck/stateSeoContent";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "New York Paycheck Calculator - Estimate Your Take-Home Pay",
  description: "Free New York paycheck calculator. See net pay after federal tax, NY state tax, Social Security, and Medicare, by pay period — plus what NYC residents should budget for local tax.",
  keywords: [
    "new york paycheck calculator",
    "new york salary calculator",
    "new york take home pay",
    "new york tax calculator",
    "net pay calculator new york",
    "new york income calculator",
    "salary calculator nyc after taxes",
    "nyc tax calculator paycheck",
    "salary after taxes ny",
    "ny paycheck tax calculator",
    "ny state tax calculator",
    "paycheck calculator new york",
    "paycheck calculator nyc",
    "calculate income tax nyc",
    "paycheck nyc",
    "new york income tax calculator",
  ],
  alternates: { canonical: "/finance/new-york-paycheck-calculator" },
  openGraph: {
    title: "New York Paycheck Calculator - Estimate Your Take-Home Pay | ToolZoneX",
    description: "Free New York paycheck calculator with 2025 federal and New York state tax brackets — see your NY income after taxes and what NYC local tax adds on top.",
    url: `${SITE_URL}/finance/new-york-paycheck-calculator`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
};

const calculatorSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "New York Paycheck Calculator",
  "description": "Estimate take-home pay in New York after federal tax, Social Security, and Medicare.",
  "url": `${SITE_URL}/finance/new-york-paycheck-calculator`,
  "applicationCategory": "FinanceApplication",
  "operatingSystem": "Web Browser",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": STATE_SEO_CONTENT["new-york"]!.faqs.map((faq) => ({
    "@type": "Question",
    "name": faq.q,
    "acceptedAnswer": { "@type": "Answer", "text": faq.a },
  })),
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(calculatorSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <PaycheckCalculator stateSlug="new-york" />
    </>
  );
}
