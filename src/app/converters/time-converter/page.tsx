import type { Metadata } from "next";
import TimeConverter from "../../../calculators/converters/TimeConverter";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "Time Converter - Seconds, Minutes, Hours, Days & More",
  description: "Free time unit converter. Convert between seconds, minutes, hours, days, weeks, months, and years.",
  keywords: ["time converter","seconds to minutes","hours to days","time unit converter","days to weeks"],
  alternates: { canonical: "/converters/time-converter" },
  openGraph: {
    title: "Time Converter - Seconds, Minutes, Hours, Days & More | ToolZoneX",
    description: "Free time unit converter. Convert between seconds, minutes, hours, days, weeks, months, and years.",
    url: `${SITE_URL}/converters/time-converter`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "TimeConverter",
  "description": "Free time unit converter. Convert between seconds, minutes, hours, days, weeks, months, and years.",
  "url": `${SITE_URL}/converters/time-converter`,
  "applicationCategory": "UtilityApplication",
  "operatingSystem": "Web Browser",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(toolSchema) }}
      />
      <TimeConverter />
    </>
  );
}
