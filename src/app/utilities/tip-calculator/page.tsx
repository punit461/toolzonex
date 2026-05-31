import type { Metadata } from "next";
import TipCalculator from "../../../calculators/TipCalculator";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://punit461.github.io/toolzonex';

export const metadata: Metadata = {
  title: "Tip Calculator - Split the Bill & Calculate Gratuity Online",
  description: "Quickly calculate restaurant tips and split the bill among friends. Free online tip calculator with custom percentages.",
  keywords: ["tip calculator", "gratuity calculator", "split bill calculator", "restaurant tip calculator"],
  alternates: { canonical: "/utilities/tip-calculator" },
  openGraph: {
    title: "Tip Calculator - Split the Bill & Calculate Gratuity Online | ToolZoneX",
    description: "Quickly calculate restaurant tips and split the bill among friends.",
    url: `${SITE_URL}/utilities/tip-calculator`,
    type: "article",
  },
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Tip Calculator",
  "description": "Quickly calculate restaurant tips and split the bill among friends.",
  "url": `${SITE_URL}/utilities/tip-calculator`,
  "applicationCategory": "UtilityApplication",
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
      <TipCalculator />
    </>
  );
}
