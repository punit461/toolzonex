import type { Metadata } from "next";
import PaycheckCalculator from "../../../calculators/paycheck/PaycheckCalculator";
import { STATE_SEO_CONTENT } from "../../../calculators/paycheck/stateSeoContent";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "Michigan Paycheck Calculator - Take-Home Pay",
  description: "Free Michigan paycheck calculator. See net pay after federal tax, state tax, Social Security, and Medicare.",
  keywords: ["michigan paycheck calculator", "michigan salary calculator", "michigan take home pay", "michigan tax calculator", "net pay calculator michigan", "michigan payroll tax calculator", "michigan paycheck tax calculator", "paycheck calculator michigan"],
  alternates: { canonical: "/finance/michigan-paycheck-calculator" },
  openGraph: {
    title: "Michigan Paycheck Calculator - Take-Home Pay | ToolZoneX",
    description: "Free Michigan paycheck calculator. See net pay after federal tax, state tax, Social Security, and Medicare.",
    url: `${SITE_URL}/finance/michigan-paycheck-calculator`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
};

const calculatorSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Michigan Paycheck Calculator",
  "description": "Estimate take-home pay in Michigan after federal tax, Social Security, and Medicare.",
  "url": `${SITE_URL}/finance/michigan-paycheck-calculator`,
  "applicationCategory": "FinanceApplication",
  "operatingSystem": "Web Browser",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": STATE_SEO_CONTENT.michigan!.faqs.map((faq) => ({
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
      <PaycheckCalculator stateSlug="michigan" />
    </>
  );
}
