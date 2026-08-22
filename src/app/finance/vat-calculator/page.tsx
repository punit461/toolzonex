import type { Metadata } from "next";
import VATCalculator from "../../../calculators/VATCalculator";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "VAT Calculator - Add or Remove VAT (UK, EU & More)",
  description: "Free VAT calculator to add or remove VAT for the UK, Germany, France, Ireland, and 15+ other countries using current standard rates.",
  keywords: ["VAT calculator", "UK VAT calculator", "EU VAT calculator", "add VAT", "remove VAT", "VAT rate calculator", "value added tax calculator", "how much is vat", "calculate vat from gross amount", "how to add vat to an amount"],
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

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Is this the standard rate or a reduced rate?",
      "acceptedAnswer": { "@type": "Answer", "text": "This calculator uses each country's standard VAT rate. Most countries also apply reduced rates (often 0-15%) to specific categories like food, books, or children's clothing — check your local tax authority if your goods or services qualify for a reduced rate." }
    },
    {
      "@type": "Question",
      "name": "How do I calculate VAT from a gross amount?",
      "acceptedAnswer": { "@type": "Answer", "text": "Switch to \"Remove VAT\" mode above and enter the gross (VAT-inclusive) figure — the calculator divides it by (1 + rate) to show the net price and the VAT amount separately." }
    }
  ]
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(vatCalculatorSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <VATCalculator />
    </>
  );
}
