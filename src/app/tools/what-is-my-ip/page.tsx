import type { Metadata } from "next";
import WhatIsMyIP from "../../../calculators/WhatIsMyIP";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://punit461.github.io/toolzonex';

export const metadata: Metadata = {
  title: "What Is My IP - Find Your Public IP Address",
  description: "Find your public IP address with location information. Free online IP lookup tool with ISP and geographic data.",
  keywords: ["what is my ip", "find ip address", "public ip", "ip lookup", "ip location", "my ip address", "ip finder", "ip checker"],
  alternates: { canonical: "/tools/what-is-my-ip" },
  openGraph: {
    title: "What Is My IP - Find Your Public IP Address | ToolZoneX",
    description: "Find your public IP address with location information. Free online IP lookup tool with ISP and geographic data.",
    url: `${SITE_URL}/tools/what-is-my-ip`,
    type: "article",
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

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(whatIsMyIPSchema) }}
      />
      <WhatIsMyIP />
    </>
  );
}