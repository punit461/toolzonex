import type { Metadata } from "next";
import MailtoLinkGenerator from "../../../calculators/tools/MailtoLinkGenerator";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "Mailto Link Generator - Create Email Links",
  description: "Generate mailto links with pre-filled subject, body, CC, and BCC fields. Free online mailto link generator tool.",
  keywords: ["mailto link generator", "create email links", "mailto links", "email links", "pre-filled emails", "email template generator", "mailto generator", "email link creator", "email mailto generator", "mailto link creator", "mail to generator", "mail to link creator", "gmail link generator", "create a mailto link", "html mailto link generator"],
  alternates: { canonical: "/tools/mailto-link-generator" },
  openGraph: {
    title: "Mailto Link Generator - Create Email Links | ToolZoneX",
    description: "Generate mailto links with pre-filled subject, body, CC, and BCC fields. Free online mailto link generator tool.",
    url: `${SITE_URL}/tools/mailto-link-generator`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
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

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Does this send the email automatically?",
      "acceptedAnswer": { "@type": "Answer", "text": "No — clicking a mailto link opens the visitor's default email app with a pre-filled draft; they still need to hit send themselves." }
    },
    {
      "@type": "Question",
      "name": "Will this work as a link creator for Gmail?",
      "acceptedAnswer": { "@type": "Answer", "text": "This tool generates a standard mailto: link, not a Gmail-specific compose URL. If the person clicking the link has Gmail set as their device's default mail handler (or uses Gmail's browser extension for mailto links), it will open a Gmail compose window — otherwise it opens whatever email client is set as default. It isn't a dedicated Gmail link generator, but it works with Gmail wherever Gmail is the default handler." }
    },
    {
      "@type": "Question",
      "name": "Do I need to fill in every field?",
      "acceptedAnswer": { "@type": "Answer", "text": "No — only the recipient email address is required. Subject, body, CC, and BCC are all optional; leave any of them blank and they're simply omitted from the generated link." }
    },
    {
      "@type": "Question",
      "name": "Can I use this mailto link creator on my website?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes — paste the generated link as the href of an <a> tag (or a button) on your site. Clicking it opens the visitor's email client with the recipient, subject, and body already filled in." }
    }
  ]
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(mailtoLinkGeneratorSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <MailtoLinkGenerator />
    </>
  );
}