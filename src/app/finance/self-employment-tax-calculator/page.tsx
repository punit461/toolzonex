import type { Metadata } from "next";
import SelfEmploymentTaxCalculator from "../../../calculators/finance/SelfEmploymentTaxCalculator";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "Self-Employment Tax Calculator (1099) - Freelance & Contractor Tax",
  description: "Free self-employment tax calculator for freelancers and 1099 contractors. Estimate Social Security, Medicare, and income tax on your net profit.",
  keywords: ["self employment tax calculator", "1099 tax calculator", "freelance tax calculator", "se tax calculator", "quarterly estimated tax calculator", "independent contractor tax"],
  alternates: { canonical: "/finance/self-employment-tax-calculator" },
  openGraph: {
    title: "Self-Employment Tax Calculator (1099) | ToolZoneX",
    description: "Estimate your self-employment tax (Social Security + Medicare) and income tax on freelance or 1099 profit.",
    url: `${SITE_URL}/finance/self-employment-tax-calculator`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
};

const calculatorSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Self-Employment Tax Calculator (1099)",
  "description": "Estimate your self-employment tax (Social Security + Medicare) and income tax on freelance or 1099 profit.",
  "url": `${SITE_URL}/finance/self-employment-tax-calculator`,
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
      <SelfEmploymentTaxCalculator />
    </>
  );
}
