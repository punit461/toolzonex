import type { Metadata } from "next";
import PaycheckCalculator from "../../../calculators/paycheck/PaycheckCalculator";
import { STATE_SEO_CONTENT } from "../../../calculators/paycheck/stateSeoContent";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "Kentucky Paycheck Calculator - Take-Home Pay",
  description: "Free Kentucky paycheck calculator. See net pay after federal tax, state tax, Social Security, and Medicare.",
  keywords: ["kentucky paycheck calculator", "kentucky salary calculator", "kentucky take home pay", "kentucky tax calculator", "net pay calculator kentucky", "ky paycheck calculator", "paycheck calculator ky"],
  alternates: { canonical: "/finance/kentucky-paycheck-calculator" },
  openGraph: {
    title: "Kentucky Paycheck Calculator - Take-Home Pay | ToolZoneX",
    description: "Free Kentucky paycheck calculator. See net pay after federal tax, state tax, Social Security, and Medicare.",
    url: `${SITE_URL}/finance/kentucky-paycheck-calculator`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
};

const calculatorSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Kentucky Paycheck Calculator",
  "description": "Estimate take-home pay in Kentucky after federal tax, Social Security, and Medicare.",
  "url": `${SITE_URL}/finance/kentucky-paycheck-calculator`,
  "applicationCategory": "FinanceApplication",
  "operatingSystem": "Web Browser",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": STATE_SEO_CONTENT.kentucky!.faqs.map((faq) => ({
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
      <PaycheckCalculator stateSlug="kentucky" />
    </>
  );
}
