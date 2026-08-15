import type { Metadata } from "next";
import ScientificCalculator from "../../../calculators/ScientificCalculator";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "Scientific Calculator - Advanced Math Online",
  description: "Advanced free online scientific calculator. Calculate trigonometry, logarithms, exponents, and more instantly.",
  keywords: ["scientific calculator", "advanced calculator", "trigonometry calculator", "math calculator online"],
  alternates: { canonical: "/utilities/scientific-calculator" },
  openGraph: {
    title: "Scientific Calculator - Advanced Math Online | ToolZoneX",
    description: "Advanced free online scientific calculator. Calculate trigonometry, logarithms, exponents, and more instantly.",
    url: `${SITE_URL}/utilities/scientific-calculator`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Scientific Calculator",
  "description": "Advanced free online scientific calculator. Calculate trigonometry, logarithms, exponents, and more instantly.",
  "url": `${SITE_URL}/utilities/scientific-calculator`,
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
      <ScientificCalculator />
    </>
  );
}
