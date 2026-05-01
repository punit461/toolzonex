import type { Metadata } from "next";
import GSTCalculator from "../../../calculators/GSTCalculator";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://punit461.github.io/toolzonex';

export const metadata: Metadata = {
  title: "GST Calculator - Add or Remove GST from Amount",
  description: "Free GST calculator to add or remove GST from any amount. Calculate inclusive and exclusive prices instantly for 5%, 12%, 18%, and 28% GST rates.",
  keywords: ["GST calculator", "GST rate", "add GST", "remove GST", "inclusive GST", "exclusive GST", "goods and services tax"],
  alternates: { canonical: "/finance/gst-calculator" },
  openGraph: {
    title: "GST Calculator - Add or Remove GST from Amount | ToolZoneX",
    description: "Free GST calculator to add or remove GST from any amount instantly.",
    url: `${SITE_URL}/finance/gst-calculator`,
    type: "article",
  },
};

const gstCalculatorSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "GST Calculator",
  "description": "Add or remove GST from any amount.",
  "url": `${SITE_URL}/finance/gst-calculator`,
  "applicationCategory": "FinanceApplication",
  "operatingSystem": "Web Browser",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "INR" },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(gstCalculatorSchema) }}
      />
      <GSTCalculator />
    </>
  );
}
