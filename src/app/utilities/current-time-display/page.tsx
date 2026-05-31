import type { Metadata } from "next";
import CurrentTimeDisplay from "../../../calculators/CurrentTimeDisplay";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://punit461.github.io/toolzonex';

export const metadata: Metadata = {
  title: "Current Time Display - World Clock & Local Time",
  description: "View the exact current local time and track timezones across the world with our interactive world clock.",
  keywords: ["current time", "world clock", "local time", "what time is it", "timezone tracker"],
  alternates: { canonical: "/utilities/current-time-display" },
  openGraph: {
    title: "Current Time Display - World Clock & Local Time | ToolZoneX",
    description: "View the exact current local time and track timezones across the world with our interactive world clock.",
    url: `${SITE_URL}/utilities/current-time-display`,
    type: "article",
  },
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Current Time Display",
  "description": "View the exact current local time and track timezones across the world with our interactive world clock.",
  "url": `${SITE_URL}/utilities/current-time-display`,
  "applicationCategory": "UtilityApplication",
  "operatingSystem": "Web Browser",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "INR" },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(toolSchema) }}
      />
      <CurrentTimeDisplay />
    </>
  );
}
