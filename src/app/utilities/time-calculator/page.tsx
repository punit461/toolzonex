import type { Metadata } from "next";
import TimeCalculator from "../../../calculators/utilities/TimeCalculator";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "Time Calculator - Add & Subtract Hours, Minutes, Seconds",
  description: "Add or subtract days, hours, minutes, and seconds easily. Free online time duration calculator.",
  keywords: ["time calculator", "add time", "subtract time", "time duration calculator", "hours and minutes calculator"],
  alternates: { canonical: "/utilities/time-calculator" },
  openGraph: {
    title: "Time Calculator - Add & Subtract Hours, Minutes, Seconds | ToolZoneX",
    description: "Add or subtract days, hours, minutes, and seconds easily.",
    url: `${SITE_URL}/utilities/time-calculator`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Time Calculator",
  "description": "Add or subtract days, hours, minutes, and seconds easily.",
  "url": `${SITE_URL}/utilities/time-calculator`,
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
      <TimeCalculator />
    </>
  );
}
