import type { Metadata } from "next";
import SalaryIncrementCalculator from "../../../calculators/SalaryIncrementCalculator";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "Salary Increment Calculator - CTC & Take-Home Salary",
  description: "Free salary increment calculator to calculate your new CTC and monthly take-home salary after an increment. Understand how raises affect your income.",
  keywords: ["salary increment calculator", "CTC calculator", "take home salary", "salary hike", "income tax after increment", "in-hand salary calculator", "ctc increment calculator", "ctc percentage calculator", "increment calculator"],
  alternates: { canonical: "/finance/salary-increment-calculator" },
  openGraph: {
    title: "Salary Increment Calculator - CTC & Take-Home Salary | ToolZoneX",
    description: "Calculate your new salary after increment and take-home amount.",
    url: `${SITE_URL}/finance/salary-increment-calculator`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
};

const salaryIncrementCalculatorSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Salary Increment Calculator",
  "description": "Calculate new CTC and monthly take-home after increment.",
  "url": `${SITE_URL}/finance/salary-increment-calculator`,
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
      "name": "How do I calculate my CTC increment?",
      "acceptedAnswer": { "@type": "Answer", "text": "Enter your current CTC and the increment percentage offered — this CTC increment calculator multiplies your current CTC by the increment percentage to get the increment amount, then adds it back to give your new CTC and its monthly equivalent." }
    },
    {
      "@type": "Question",
      "name": "How is increment percentage on CTC calculated?",
      "acceptedAnswer": { "@type": "Answer", "text": "Increment percentage = (New CTC − Current CTC) ÷ Current CTC × 100. If you know both your old and new CTC and want to find the percentage rather than the new amount, subtract the two, divide by the old CTC, and multiply by 100." }
    },
  ]
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(salaryIncrementCalculatorSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <SalaryIncrementCalculator />
    </>
  );
}
