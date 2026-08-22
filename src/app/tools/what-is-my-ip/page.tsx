import type { Metadata } from "next";
import WhatIsMyIP from "../../../calculators/WhatIsMyIP";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "What Is My IP - Find Your Public IP Address",
  description: "Find your public IP address with location information. Free online IP lookup tool with ISP and geographic data.",
  keywords: ["what is my ip", "find ip address", "public ip", "ip lookup", "ip location", "my ip address", "ip finder", "ip checker", "what is my ip location", "whats my ip location", "where is my ip location", "my ip address location"],
  alternates: { canonical: "/tools/what-is-my-ip" },
  openGraph: {
    title: "What Is My IP - Find Your Public IP Address | ToolZoneX",
    description: "Find your public IP address with location information. Free online IP lookup tool with ISP and geographic data.",
    url: `${SITE_URL}/tools/what-is-my-ip`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
};

const whatIsMyIPSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "What Is My IP",
  "description": "Find your public IP address with location information. Free online IP lookup tool with ISP and geographic data.",
  "url": `${SITE_URL}/tools/what-is-my-ip`,
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
      "name": "Can this reveal my exact home address?",
      "acceptedAnswer": { "@type": "Answer", "text": "No — an IP address typically reveals only approximate location (city or region level) and your ISP, not a precise street address." }
    },
    {
      "@type": "Question",
      "name": "How do I find my IP address location?",
      "acceptedAnswer": { "@type": "Answer", "text": "This page detects it automatically — as soon as it loads, your public IP address and its approximate country, region, and city appear above, with no sign-up or extra steps required." }
    },
    {
      "@type": "Question",
      "name": "Why does my IP location show the wrong city?",
      "acceptedAnswer": { "@type": "Answer", "text": "IP geolocation is based on which ISP block your address falls in, not GPS. Mobile networks and VPNs often route traffic through a hub in a different city or region, so the result can be off by tens or hundreds of kilometers." }
    }
  ]
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(whatIsMyIPSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <WhatIsMyIP />
    </>
  );
}