import type { Metadata } from "next";
import UKStampDutyCalculator from "../../../calculators/finance/UKStampDutyCalculator";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "UK Stamp Duty Calculator (SDLT) - England & Northern Ireland",
  description: "Free UK Stamp Duty Land Tax (SDLT) calculator for England & Northern Ireland. Includes first-time buyer relief and the additional-property surcharge.",
  keywords: ["stamp duty calculator", "sdlt calculator", "stamp duty land tax", "first time buyer stamp duty", "uk property tax calculator", "second home stamp duty"],
  alternates: { canonical: "/finance/uk-stamp-duty-calculator" },
  openGraph: {
    title: "UK Stamp Duty Calculator (SDLT) | ToolZoneX",
    description: "Calculate Stamp Duty Land Tax for England & Northern Ireland, including first-time buyer relief and the additional-property surcharge.",
    url: `${SITE_URL}/finance/uk-stamp-duty-calculator`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
};

const calculatorSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "UK Stamp Duty Calculator (SDLT)",
  "description": "Calculate Stamp Duty Land Tax for England & Northern Ireland, including first-time buyer relief and the additional-property surcharge.",
  "url": `${SITE_URL}/finance/uk-stamp-duty-calculator`,
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
      <UKStampDutyCalculator />
    </>
  );
}
