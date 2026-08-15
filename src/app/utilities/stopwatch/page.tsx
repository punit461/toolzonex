import type { Metadata } from "next";
import Stopwatch from "../../../calculators/Stopwatch";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "Online Stopwatch - Free Timer with Laps",
  description: "A simple, fast, and precise online stopwatch with millisecond tracking and lap times. Free productivity tool.",
  keywords: ["online stopwatch", "stopwatch timer", "stopwatch with laps", "time tracking", "free stopwatch"],
  alternates: { canonical: "/utilities/stopwatch" },
  openGraph: {
    title: "Online Stopwatch - Free Timer with Laps | ToolZoneX",
    description: "A simple, fast, and precise online stopwatch with millisecond tracking and lap times. Free productivity tool.",
    url: `${SITE_URL}/utilities/stopwatch`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Online Stopwatch",
  "description": "A simple, fast, and precise online stopwatch with millisecond tracking and lap times.",
  "url": `${SITE_URL}/utilities/stopwatch`,
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
      <Stopwatch />
    </>
  );
}
