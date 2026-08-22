import type { Metadata } from "next";
import PaycheckCalculator from "../../../calculators/paycheck/PaycheckCalculator";
import { STATE_SEO_CONTENT } from "../../../calculators/paycheck/stateSeoContent";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "North Carolina Paycheck Calculator - Take-Home Pay",
  description: "Free North Carolina paycheck calculator. See net pay after federal tax, North Carolina's flat 4.5% state tax, Social Security, and Medicare.",
  keywords: [
    "north carolina paycheck calculator",
    "north carolina salary calculator",
    "north carolina take home pay",
    "north carolina tax calculator",
    "net pay calculator north carolina",
    "north carolina payroll calculator",
    "paycheck calculator nc",
    "bonus tax calculator nc",
    "paycheckcity nc",
  ],
  alternates: { canonical: "/finance/north-carolina-paycheck-calculator" },
  openGraph: {
    title: "North Carolina Paycheck Calculator - Take-Home Pay | ToolZoneX",
    description: "Free North Carolina paycheck calculator. See net pay after federal tax, state tax, Social Security, and Medicare.",
    url: `${SITE_URL}/finance/north-carolina-paycheck-calculator`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
};

const calculatorSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "North Carolina Paycheck Calculator",
  "description": "Estimate take-home pay in North Carolina after federal tax, Social Security, and Medicare.",
  "url": `${SITE_URL}/finance/north-carolina-paycheck-calculator`,
  "applicationCategory": "FinanceApplication",
  "operatingSystem": "Web Browser",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": STATE_SEO_CONTENT["north-carolina"]!.faqs.map((faq) => ({
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
      <PaycheckCalculator stateSlug="north-carolina" />
    </>
  );
}
