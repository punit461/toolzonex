import type { Metadata } from "next";
import BasicCalculator from "../../../calculators/BasicCalculator";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://punit461.github.io/toolzonex';

export const metadata: Metadata = {
  title: "Basic Calculator - Free Online Math Calculator",
  description: "A simple, fast, and free online calculator for standard mathematical operations. Perfect for quick everyday math.",
  keywords: ["online calculator", "basic calculator", "math calculator", "addition subtraction calculator"],
  alternates: { canonical: "/utilities/basic-calculator" },
  openGraph: {
    title: "Basic Calculator - Free Online Math Calculator | ToolZoneX",
    description: "A simple, fast, and free online calculator for standard mathematical operations.",
    url: `${SITE_URL}/utilities/basic-calculator`,
    type: "article",
  },
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Basic Calculator",
  "description": "A simple, fast, and free online calculator for standard mathematical operations.",
  "url": `${SITE_URL}/utilities/basic-calculator`,
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
      <BasicCalculator />
    </>
  );
}
