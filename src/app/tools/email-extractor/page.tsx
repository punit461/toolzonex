import type { Metadata } from "next";
import EmailExtractor from "../../../calculators/EmailExtractor";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "Email Extractor - Extract Emails from Text",
  description: "Extract all email addresses from any text. Free online email extractor tool to find and copy email addresses quickly.",
  keywords: ["email extractor", "extract emails", "find email addresses", "email finder", "copy emails", "email parser", "email scanner"],
  alternates: { canonical: "/tools/email-extractor" },
  openGraph: {
    title: "Email Extractor - Extract Emails from Text | ToolZoneX",
    description: "Extract all email addresses from any text. Free online email extractor tool to find and copy email addresses quickly.",
    url: `${SITE_URL}/tools/email-extractor`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
};

const emailExtractorSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Email Extractor",
  "description": "Extract all email addresses from any text. Free online email extractor tool to find and copy email addresses quickly.",
  "url": `${SITE_URL}/tools/email-extractor`,
  "applicationCategory": "UtilityApplication",
  "operatingSystem": "Web Browser",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "INR" },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(emailExtractorSchema) }}
      />
      <EmailExtractor />
    </>
  );
}