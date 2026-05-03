import type { Metadata } from "next";
import PhoneValidator from "../../../calculators/PhoneValidator";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://punit461.github.io/toolzonex';

export const metadata: Metadata = {
  title: "Phone Validator - Validate Phone Numbers",
  description: "Validate and format phone numbers for multiple countries. Free online phone number validator with country code support.",
  keywords: ["phone validator", "validate phone numbers", "phone number format", "country codes", "phone number checker", "international phone validation", "phone format checker", "mobile number validator"],
  alternates: { canonical: "/tools/phone-validator" },
  openGraph: {
    title: "Phone Validator - Validate Phone Numbers | ToolZoneX",
    description: "Validate and format phone numbers for multiple countries. Free online phone number validator with country code support.",
    url: `${SITE_URL}/tools/phone-validator`,
    type: "article",
  },
};

const phoneValidatorSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Phone Validator",
  "description": "Validate and format phone numbers for multiple countries. Free online phone number validator with country code support.",
  "url": `${SITE_URL}/tools/phone-validator`,
  "applicationCategory": "UtilityApplication",
  "operatingSystem": "Web Browser",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "INR" },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(phoneValidatorSchema) }}
      />
      <PhoneValidator />
    </>
  );
}