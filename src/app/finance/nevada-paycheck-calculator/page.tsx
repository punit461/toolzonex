import type { Metadata } from "next";
import PaycheckCalculator from "../../../calculators/paycheck/PaycheckCalculator";
import { STATE_SEO_CONTENT } from "../../../calculators/paycheck/stateSeoContent";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "Nevada Paycheck Calculator - Take-Home Pay",
  description: "Free Nevada paycheck calculator. Nevada has no state income tax — see net pay after federal tax, Social Security, and Medicare.",
  keywords: ["nevada paycheck calculator", "nevada salary calculator", "nevada take home pay", "nevada tax calculator", "net pay calculator nevada", "paycheck calculator nv", "nevada payroll tax calculator", "nevada payroll calculator", "nv paycheck calculator"],
  alternates: { canonical: "/finance/nevada-paycheck-calculator" },
  openGraph: {
    title: "Nevada Paycheck Calculator - Take-Home Pay | ToolZoneX",
    description: "Free Nevada paycheck calculator. Nevada has no state income tax — see net pay after federal tax, Social Security, and Medicare.",
    url: `${SITE_URL}/finance/nevada-paycheck-calculator`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
};

const calculatorSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Nevada Paycheck Calculator",
  "description": "Estimate take-home pay in Nevada after federal tax, Social Security, and Medicare.",
  "url": `${SITE_URL}/finance/nevada-paycheck-calculator`,
  "applicationCategory": "FinanceApplication",
  "operatingSystem": "Web Browser",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": STATE_SEO_CONTENT.nevada!.faqs.map((faq) => ({
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
      <PaycheckCalculator stateSlug="nevada" />
    </>
  );
}
