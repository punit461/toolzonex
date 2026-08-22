import type { Metadata } from "next";
import WhatIsMyIP from "../../../calculators/tools/WhatIsMyIP";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "What Is My IP - Find Your Public IP Address",
  description: "Find your public IP address with location information. Free online IP lookup tool with ISP and geographic data.",
  keywords: ["what is my ip", "find ip address", "public ip", "ip lookup", "ip location", "my ip address", "ip finder", "ip checker", "what is my ip location", "whats my ip location", "where is my ip location", "my ip address location", "public ip vs private ip", "ipv4 vs ipv6", "should i change my ip address", "wheres my ip", "where's my ip location", "where my ip", "where my ip address", "find out my ip", "find my public ip", "find public ip address", "what is my ip address public", "what is my ip address how to check", "whats my public ip address", "what's my public ip", "my ip public", "my ip now", "whats my ip address location", "where is my public ip address", "how to find your public ip", "how to find out my public ip", "how do i find out where my ip address is located", "how do i find my public ip address", "how do i find my public ip", "check my ip and location", "check what is my ip", "check my ip address and location", "how to check my ip location", "how to check my ip address location", "how to check your ip location", "what is my ip location", "how to know your public ip address"],
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
    },
    {
      "@type": "Question",
      "name": "Should I change my public IP address?",
      "acceptedAnswer": { "@type": "Answer", "text": "Usually you don't need to — most home connections are already on a dynamic IP that changes on its own whenever your ISP reassigns addresses, such as after a router restart. You'd deliberately change it to get a fresh address if your current one has been rate-limited or blocked by a site, to route around a region restriction, or for extra privacy on public Wi-Fi. That's typically done through a VPN, a proxy, or by asking your ISP for a new lease." }
    },
    {
      "@type": "Question",
      "name": "What's the difference between an IPv4 and IPv6 address?",
      "acceptedAnswer": { "@type": "Answer", "text": "IPv4 addresses look like 203.0.113.42 — four numbers separated by dots — and are the older, more limited format, with roughly 4.3 billion possible addresses, most of which are already allocated. IPv6 addresses look like 2001:db8::8a2e:370:7334 and use a far larger address space to keep pace with the number of internet-connected devices. Most home connections still get an IPv4 address by default, which is why that's typically what you see above; some ISPs and mobile carriers now assign IPv6 alongside or instead of it." }
    },
    {
      "@type": "Question",
      "name": "Where's my IP address and what's my current location?",
      "acceptedAnswer": { "@type": "Answer", "text": "Your public IP address and current location appear automatically above, with no need to search elsewhere — this page detects it live. If you're wondering where's my IP or where's my IP location, look at the IP box for the address itself and the Location Information panel just below it for your approximate country, region, and city." }
    },
    {
      "@type": "Question",
      "name": "How do I find my public IP address?",
      "acceptedAnswer": { "@type": "Answer", "text": "Just open this page — your public IP is found and displayed automatically, no sign-up or extra clicks required. If you've changed networks or reconnected to Wi-Fi and want the very latest reading, click \"Refresh\" to find your public IP address again immediately." }
    },
    {
      "@type": "Question",
      "name": "How do I check my IP address and location together?",
      "acceptedAnswer": { "@type": "Answer", "text": "This page checks both at once: your public IP appears at the top, and the Location Information panel beneath it shows the country, region, city, and ISP tied to that address — so you don't need a separate lookup to check your IP location." }
    },
    {
      "@type": "Question",
      "name": "What is my public IP address right now?",
      "acceptedAnswer": { "@type": "Answer", "text": "The number shown at the top of this page under \"Your Public IP Address\" is your current public IP, detected the moment the page loads. It can change over time — most home connections are on a dynamic IP — so if you want to confirm what it is right now rather than an older cached result, hit Refresh." }
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