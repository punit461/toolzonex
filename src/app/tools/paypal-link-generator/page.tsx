import type { Metadata } from "next";
import PayPalLinkGenerator from "../../../calculators/PayPalLinkGenerator";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://punit461.github.io/toolzonex';

export const metadata: Metadata = {
  title: "PayPal Link Generator - Create Payment Links",
  description: "Generate PayPal.me links and payment request links. Free online PayPal link generator tool for easy payments.",
  keywords: ["PayPal link generator", "create PayPal links", "PayPal.me generator", "payment links", "PayPal buttons", "online payments", "PayPal creator", "payment request generator"],
  alternates: { canonical: "/tools/paypal-link-generator" },
  openGraph: {
    title: "PayPal Link Generator - Create Payment Links | ToolZoneX",
    description: "Generate PayPal.me links and payment request links. Free online PayPal link generator tool for easy payments.",
    url: `${SITE_URL}/tools/paypal-link-generator`,
    type: "article",
  },
};

const payPalLinkGeneratorSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "PayPal Link Generator",
  "description": "Generate PayPal.me links and payment request links. Free online PayPal link generator tool for easy payments.",
  "url": `${SITE_URL}/tools/paypal-link-generator`,
  "applicationCategory": "UtilityApplication",
  "operatingSystem": "Web Browser",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "INR" },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(payPalLinkGeneratorSchema) }}
      />
      <PayPalLinkGenerator />
    </>
  );
}