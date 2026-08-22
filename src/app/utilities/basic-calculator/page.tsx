import type { Metadata } from "next";
import BasicCalculator from "../../../calculators/utilities/BasicCalculator";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "Basic Calculator - Free Online Math Calculator",
  description: "A simple, fast, and free online calculator for standard mathematical operations. Perfect for quick everyday math.",
  keywords: ["online calculator", "basic calculator", "math calculator", "addition subtraction calculator", "basic operations calculator", "simple online calculator", "normal calculator online"],
  alternates: { canonical: "/utilities/basic-calculator" },
  openGraph: {
    title: "Basic Calculator - Free Online Math Calculator | ToolZoneX",
    description: "A simple, fast, and free online calculator for standard mathematical operations.",
    url: `${SITE_URL}/utilities/basic-calculator`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
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

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Does this basic calculator have a percentage button?",
      "acceptedAnswer": { "@type": "Answer", "text": "This basic calculator covers the four standard operations — addition, subtraction, multiplication, and division — without a dedicated percentage button. For percentage math (discounts, tax, percentage change), use the dedicated Percentage Calculator instead." }
    },
  ]
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(toolSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <BasicCalculator />
    </>
  );
}
