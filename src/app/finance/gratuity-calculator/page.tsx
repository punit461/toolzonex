import type { Metadata } from "next";
import GratuityCalculator from "../../../calculators/finance/GratuityCalculator";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "Gratuity Calculator - Calculate Gratuity Amount",
  description: "Free gratuity calculator to calculate your end-of-service gratuity amount. Understand your employee benefits with this accurate calculator.",
  keywords: ["gratuity calculator", "gratuity amount", "end of service gratuity", "employee benefits", "gratuity act", "service gratuity", "what is gratuity in india", "payment of gratuity act 1972", "gratuity eligibility"],
  alternates: { canonical: "/finance/gratuity-calculator" },
  openGraph: {
    title: "Gratuity Calculator - Calculate Gratuity Amount | ToolZoneX",
    description: "Calculate your gratuity amount as an employee.",
    url: `${SITE_URL}/finance/gratuity-calculator`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
};

const gratuityCalculatorSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Gratuity Calculator",
  "description": "Calculate gratuity amount for employees.",
  "url": `${SITE_URL}/finance/gratuity-calculator`,
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
      "name": "What is gratuity in India?",
      "acceptedAnswer": { "@type": "Answer", "text": "Gratuity is a lump-sum payment an employer makes to an employee as a reward for continuous, long-term service, governed in India by the Payment of Gratuity Act, 1972. It's paid out on resignation, retirement, superannuation, or death/disablement, and is separate from your regular salary or provident fund." }
    },
    {
      "@type": "Question",
      "name": "Who is eligible for gratuity in India?",
      "acceptedAnswer": { "@type": "Answer", "text": "An employee is generally eligible for gratuity after completing at least 5 continuous years of service with the same employer, calculated using the formula (15 × Last Drawn Salary × Years of Service) / 26. The 5-year requirement is waived in cases of death or disablement." }
    },
    {
      "@type": "Question",
      "name": "Is gratuity taxable?",
      "acceptedAnswer": { "@type": "Answer", "text": "For government employees, gratuity is fully tax-exempt. For private-sector employees covered under the Payment of Gratuity Act, exemption is available up to ₹20 lakh; amounts above that are taxable." }
    },
  ]
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(gratuityCalculatorSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <GratuityCalculator />
    </>
  );
}
