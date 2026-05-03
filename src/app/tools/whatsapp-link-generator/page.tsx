import type { Metadata } from "next";
import WhatsAppLinkGenerator from "../../../calculators/WhatsAppLinkGenerator";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://punit461.github.io/toolzonex';

export const metadata: Metadata = {
  title: "WhatsApp Link Generator - Create Click-to-Chat Links",
  description: "Generate WhatsApp click-to-chat links with pre-filled messages. Free online WhatsApp link generator tool.",
  keywords: ["WhatsApp link generator", "create WhatsApp links", "click-to-chat", "WhatsApp business", "WhatsApp contact", "WhatsApp message links", "WhatsApp generator", "WhatsApp buttons"],
  alternates: { canonical: "/tools/whatsapp-link-generator" },
  openGraph: {
    title: "WhatsApp Link Generator - Create Click-to-Chat Links | ToolZoneX",
    description: "Generate WhatsApp click-to-chat links with pre-filled messages. Free online WhatsApp link generator tool.",
    url: `${SITE_URL}/tools/whatsapp-link-generator`,
    type: "article",
  },
};

const whatsAppLinkGeneratorSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "WhatsApp Link Generator",
  "description": "Generate WhatsApp click-to-chat links with pre-filled messages. Free online WhatsApp link generator tool.",
  "url": `${SITE_URL}/tools/whatsapp-link-generator`,
  "applicationCategory": "UtilityApplication",
  "operatingSystem": "Web Browser",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "INR" },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(whatsAppLinkGeneratorSchema) }}
      />
      <WhatsAppLinkGenerator />
    </>
  );
}