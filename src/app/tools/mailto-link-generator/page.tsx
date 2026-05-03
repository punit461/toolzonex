import type { Metadata } from "next";
import MailtoLinkGenerator from "../../../calculators/MailtoLinkGenerator";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://punit461.github.io/toolzonex';

export const metadata: Metadata = {
  title: "Mailto Link Generator - Create Email Links",
  description: "Generate mailto links with pre-filled subject, body, CC, and BCC fields. Free online mailto link generator tool.",
  keywords: ["mailto link generator", "create email links", "mailto links", "email links", "pre-filled emails", "email template generator", "mailto generator", "email link creator"],
  alternates: { canonical: "/tools/mailto-link-generator" },
  openGraph: {
    title: "Mailto Link Generator - Create Email Links | ToolZoneX",
    description: "Generate mailto links with pre-filled subject, body, CC, and BCC fields. Free online mailto link generator tool.",
    url: `${SITE_URL}/tools/mailto-link-generator`,
    type: "article",
  },
};

const mailtoLinkGeneratorSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Mailto Link Generator",
  "description": "Generate mailto links with pre-filled subject, body, CC, and BCC fields. Free online mailto link generator tool.",
  "url": `${SITE_URL}/tools/mailto-link-generator`,
  "applicationCategory": "UtilityApplication",
  "operatingSystem": "Web Browser",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "INR" },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(mailtoLinkGeneratorSchema) }}
      />
      <MailtoLinkGenerator />
    </>
  );
}