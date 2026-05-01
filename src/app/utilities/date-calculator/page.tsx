import type { Metadata } from "next";
import DateCalculator from "../../../calculators/DateCalculator";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://punit461.github.io/toolzonex';

export const metadata: Metadata = {
  title: "Date Calculator - Days Between Dates & Date Operations",
  description: "Free date calculator to calculate days between two dates. Add or subtract days from any date with this easy-to-use date calculation tool.",
  keywords: ["date calculator", "days between dates", "date difference", "add days", "subtract days", "date math", "business days calculator"],
  alternates: { canonical: "/utilities/date-calculator" },
  openGraph: {
    title: "Date Calculator - Days Between Dates & Date Operations | ToolZoneX",
    description: "Calculate days between two dates. Add or subtract days from any date.",
    url: `${SITE_URL}/utilities/date-calculator`,
    type: "article",
  },
};

const dateCalculatorSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Date Calculator",
  "description": "Calculate days between dates. Add or subtract days.",
  "url": `${SITE_URL}/utilities/date-calculator`,
  "applicationCategory": "UtilityApplication",
  "operatingSystem": "Web Browser",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "INR" },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(dateCalculatorSchema) }}
      />
      <DateCalculator />
    </>
  );
}
