import type { Metadata } from "next";
import VerticalTextGenerator from "../../../calculators/generators/VerticalTextGenerator";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "Vertical Text Generator - Stack Text Vertically",
  description: "Convert your text into vertical aesthetic formats for social media and chats instantly.",
  keywords: ["vertical text generator", "stack text", "vertical letters", "aesthetic text vertical", "text column generator", "vertical text copy and paste"],
  alternates: { canonical: "/generators/vertical-text-generator" },
  openGraph: {
    title: "Vertical Text Generator - Stack Text Vertically | ToolZoneX",
    description: "Convert your text into vertical aesthetic formats for social media and chats instantly.",
    url: `${SITE_URL}/generators/vertical-text-generator`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Vertical Text Generator",
  "description": "Convert your text into vertical aesthetic formats for social media and chats instantly.",
  "url": `${SITE_URL}/generators/vertical-text-generator`,
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
      "name": "Can I copy and paste the vertical text anywhere?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes — click \"Copy\" on the result panel and it's ready for vertical text copy and paste into Instagram bios, TikTok captions, Discord, or any text field that accepts plain text." }
    },
    {
      "@type": "Question",
      "name": "Will this work on any platform?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes — the output is plain text with line breaks, so it works anywhere text can be pasted, including social media bios and chat apps." }
    }
  ]
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(toolSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <VerticalTextGenerator />
    </>
  );
}
