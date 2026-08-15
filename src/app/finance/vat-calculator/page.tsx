import type { Metadata } from "next";
import VATCalculator from "../../../calculators/VATCalculator";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "VAT Calculator - Add or Remove VAT (UK, EU & More)",
  description: "Free VAT calculator to add or remove VAT for the UK, Germany, France, Ireland, and 15+ other countries using current standard rates.",
  keywords: ["VAT calculator", "UK VAT calculator", "EU VAT calculator", "add VAT", "remove VAT", "VAT rate calculator", "value added tax calculator"],
  alternates: { canonical: "/finance/vat-calculator" },
  openGraph: {
    title: "VAT Calculator - Add or Remove VAT (UK, EU & More) | ToolZoneX",
    description: "Free VAT calculator to add or remove VAT for the UK, Germany, France, Ireland, and 15+ other countries.",
    url: `${SITE_URL}/finance/vat-calculator`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
};

const vatCalculatorSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "VAT Calculator",
  "description": "Add or remove VAT for the UK, EU, and other countries using current standard rates.",
  "url": `${SITE_URL}/finance/vat-calculator`,
  "applicationCategory": "FinanceApplication",
  "operatingSystem": "Web Browser",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "GBP" },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(vatCalculatorSchema) }}
      />
      <VATCalculator />
    </>
  );
}
