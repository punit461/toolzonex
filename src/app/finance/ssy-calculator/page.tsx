import type { Metadata } from "next";
import SSYCalculator from "../../../calculators/finance/SSYCalculator";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "SSY Calculator - Sukanya Samriddhi Yojana Returns",
  description: "Free SSY calculator to calculate Sukanya Samriddhi Yojana maturity amount. Plan for your daughter's education with this government scheme.",
  keywords: ["SSY calculator", "Sukanya Samriddhi Yojana", "SSY maturity", "SSY interest rate", "daughter marriage planning", "education fund", "what is ssy scheme", "how is ssy interest calculated", "ssy account benefits"],
  alternates: { canonical: "/finance/ssy-calculator" },
  openGraph: {
    title: "SSY Calculator - Sukanya Samriddhi Yojana Returns | ToolZoneX",
    description: "Calculate Sukanya Samriddhi Yojana maturity amount.",
    url: `${SITE_URL}/finance/ssy-calculator`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
};

const ssyCalculatorSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "SSY Calculator",
  "description": "Calculate Sukanya Samriddhi Yojana maturity value.",
  "url": `${SITE_URL}/finance/ssy-calculator`,
  "applicationCategory": "FinanceApplication",
  "operatingSystem": "Web Browser",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "INR" },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is the SSY scheme?",
      "acceptedAnswer": { "@type": "Answer", "text": "Sukanya Samriddhi Yojana (SSY) is a government-backed small savings scheme launched under the 'Beti Bachao, Beti Padhao' campaign, letting parents or guardians open a savings account for a girl child (below age 10) to build a fund for her future education and marriage expenses." }
    },
    {
      "@type": "Question",
      "name": "How is SSY interest calculated?",
      "acceptedAnswer": { "@type": "Answer", "text": "SSY interest is calculated annually on the account's lowest balance between the 5th and last day of each month, compounded yearly, at the government-notified rate (currently 8.2% p.a.). This calculator applies that annual compounding to your yearly deposits over the 15-year deposit period and the following years until the account matures at 21 years." }
    },
    {
      "@type": "Question",
      "name": "What are the benefits of an SSY account?",
      "acceptedAnswer": { "@type": "Answer", "text": "SSY offers a higher interest rate than most PPF and fixed deposit options, falls under the EEE (Exempt-Exempt-Exempt) tax category so deposits (up to ₹1.5L) qualify for Section 80C deduction and both interest and maturity proceeds are tax-free, and it's backed by the Government of India." }
    },
  ]
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ssyCalculatorSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <SSYCalculator />
    </>
  );
}
