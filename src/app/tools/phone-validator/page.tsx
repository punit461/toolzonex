import type { Metadata } from "next";
import PhoneValidator from "../../../calculators/tools/PhoneValidator";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "Phone Validator - Validate Phone Numbers",
  description: "Validate and format phone numbers for multiple countries. Free online phone number validator with country code support.",
  keywords: ["phone validator", "validate phone numbers", "phone number format", "country codes", "phone number checker", "international phone validation", "phone format checker", "mobile number validator", "phonevalidator", "cell phone validator", "validate phone number online", "phone number verification tool", "phone number verification tools", "check phone number validity", "validate phone number", "check phone validity", "validator number", "mobile number validation", "telephone number validation", "phone number validity", "validating phone numbers", "check if telephone number is valid", "best phone number validator"],
  alternates: { canonical: "/tools/phone-validator" },
  openGraph: {
    title: "Phone Validator - Validate Phone Numbers | ToolZoneX",
    description: "Validate and format phone numbers for multiple countries. Free online phone number validator with country code support.",
    url: `${SITE_URL}/tools/phone-validator`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
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