import type { Metadata } from "next";
import RuleOfThreeCalculator from "../../../calculators/RuleOfThreeCalculator";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://punit461.github.io/toolzonex';

export const metadata: Metadata = {
  title: "Rule of Three Calculator - Solve Proportions Online",
  description: "Solve proportions instantly with our Rule of Three calculator. Enter three values to find the fourth unknown value.",
  keywords: ["rule of three calculator", "proportion calculator", "cross multiplication calculator", "ratio calculator"],
  alternates: { canonical: "/utilities/rule-of-three-calculator" },
  openGraph: {
    title: "Rule of Three Calculator - Solve Proportions Online | ToolZoneX",
    description: "Solve proportions instantly with our Rule of Three calculator.",
    url: `${SITE_URL}/utilities/rule-of-three-calculator`,
    type: "article",
  },
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Rule of Three Calculator",
  "description": "Solve proportions instantly with our Rule of Three calculator.",
  "url": `${SITE_URL}/utilities/rule-of-three-calculator`,
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "Web Browser",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "INR" },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(toolSchema) }}
      />
      <RuleOfThreeCalculator />
    </>
  );
}
