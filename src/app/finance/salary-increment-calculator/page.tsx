import type { Metadata } from "next";
import SalaryIncrementCalculator from "../../../calculators/SalaryIncrementCalculator";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://punit461.github.io/toolzonex';

export const metadata: Metadata = {
  title: "Salary Increment Calculator - CTC & Take-Home Salary",
  description: "Free salary increment calculator to calculate your new CTC and monthly take-home salary after an increment. Understand how raises affect your income.",
  keywords: ["salary increment calculator", "CTC calculator", "take home salary", "salary hike", "income tax after increment", "in-hand salary calculator"],
  alternates: { canonical: "/finance/salary-increment-calculator" },
  openGraph: {
    title: "Salary Increment Calculator - CTC & Take-Home Salary | ToolZoneX",
    description: "Calculate your new salary after increment and take-home amount.",
    url: `${SITE_URL}/finance/salary-increment-calculator`,
    type: "article",
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

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(salaryIncrementCalculatorSchema) }}
      />
      <SalaryIncrementCalculator />
    </>
  );
}
