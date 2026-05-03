import type { Metadata } from "next";
import UserAgentParser from "../../../calculators/UserAgentParser";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://punit461.github.io/toolzonex';

export const metadata: Metadata = {
  title: "User Agent Parser - Analyze Browser Information",
  description: "Parse and analyze user agent strings to detect browser, OS, device, and engine information. Free online user agent parser tool.",
  keywords: ["user agent parser", "analyze browser", "user agent string", "browser detection", "device information", "OS detection", "user agent analyzer", "browser information"],
  alternates: { canonical: "/tools/user-agent-parser" },
  openGraph: {
    title: "User Agent Parser - Analyze Browser Information | ToolZoneX",
    description: "Parse and analyze user agent strings to detect browser, OS, device, and engine information. Free online user agent parser tool.",
    url: `${SITE_URL}/tools/user-agent-parser`,
    type: "article",
  },
};

const userAgentParserSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "User Agent Parser",
  "description": "Parse and analyze user agent strings to detect browser, OS, device, and engine information. Free online user agent parser tool.",
  "url": `${SITE_URL}/tools/user-agent-parser`,
  "applicationCategory": "UtilityApplication",
  "operatingSystem": "Web Browser",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "INR" },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(userAgentParserSchema) }}
      />
      <UserAgentParser />
    </>
  );
}