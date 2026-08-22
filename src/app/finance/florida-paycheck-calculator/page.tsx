import type { Metadata } from "next";
import PaycheckCalculator from "../../../calculators/paycheck/PaycheckCalculator";
import { STATE_SEO_CONTENT } from "../../../calculators/paycheck/stateSeoContent";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "Florida Paycheck Calculator - Estimate Your Take-Home Pay",
  description: "Free Florida paycheck calculator. Florida has no state income tax — see net pay after federal tax, Social Security, and Medicare.",
  keywords: [
    "florida paycheck calculator",
    "florida salary calculator",
    "florida take home pay",
    "florida tax calculator",
    "net pay calculator florida",
    "paycheck calculator florida salary",
    "florida pay calculator",
    "pay stub calculator florida",
    "calculate tax florida",
    "florida paycheck calc",
    "florida payroll calculator",
    "florida weekly paycheck calculator",
  ],
  alternates: { canonical: "/finance/florida-paycheck-calculator" },
  openGraph: {
    title: "Florida Paycheck Calculator - Estimate Your Take-Home Pay | ToolZoneX",
    description: "Free Florida paycheck calculator with 2025 federal tax brackets — Florida has no state income tax.",
    url: `${SITE_URL}/finance/florida-paycheck-calculator`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
};

const calculatorSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Florida Paycheck Calculator",
  "description": "Estimate take-home pay in Florida after federal tax, Social Security, and Medicare.",
  "url": `${SITE_URL}/finance/florida-paycheck-calculator`,
  "applicationCategory": "FinanceApplication",
  "operatingSystem": "Web Browser",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": STATE_SEO_CONTENT.florida!.faqs.map((faq) => ({
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
      <PaycheckCalculator stateSlug="florida" />
    </>
  );
}
