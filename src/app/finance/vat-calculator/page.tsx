import type { Metadata } from "next";
import VATCalculator from "../../../calculators/VATCalculator";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "UK VAT Calculator - Add or Remove VAT (20%)",
  description: "Free UK VAT calculator to add or remove 20% VAT. Also calculate standard VAT for Germany, France, Ireland, and 15+ other countries.",
  keywords: ["VAT calculator", "UK VAT calculator", "EU VAT calculator", "add VAT", "remove VAT", "VAT rate calculator", "value added tax calculator", "how much is vat", "calculate vat from gross amount", "how to add vat to an amount", "price excluding vat", "remove vat from price", "vat included calculator", "net vat calculator", "duty and vat calculator", "vat amount uk", "exclude vat calculator", "vat gross", "calculating vat", "what is net of vat", "vat tax calculator", "how to calculate vat percentage", "vat calculator formula", "vat calculator 5%"],
  alternates: { canonical: "/finance/vat-calculator" },
  openGraph: {
    title: "UK VAT Calculator - Add or Remove VAT (20%) | ToolZoneX",
    description: "Add or remove 20% UK VAT, or calculate standard VAT for Germany, France, Ireland, and more countries.",
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
    },
    {
      "@type": "Question",
      "name": "How do I add VAT to a price?",
      "acceptedAnswer": { "@type": "Answer", "text": "Select \"Add VAT\" mode, enter the net amount excluding VAT, and choose the correct rate — the calculator multiplies the net price by the VAT rate and adds it to give the VAT-inclusive gross total. For example, adding 20% UK VAT to £5,500 comes to £6,600." }
    },
    {
      "@type": "Question",
      "name": "How do I remove VAT from a price?",
      "acceptedAnswer": { "@type": "Answer", "text": "Select \"Remove VAT\" mode and enter the gross (VAT-inclusive) price. The calculator divides it by (1 + rate) to give you the price excluding VAT — the net amount — along with the VAT portion that was included in the original figure." }
    },
    {
      "@type": "Question",
      "name": "How is VAT calculated as a percentage?",
      "acceptedAnswer": { "@type": "Answer", "text": "VAT is calculated by multiplying the net price by the VAT rate as a decimal (rate ÷ 100). For example, the VAT amount on £10 at the UK's 20% rate is £10 × 0.20 = £2, and VAT on £400 works out to £80. The formula is: VAT amount = Net price × (Rate ÷ 100)." }
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
