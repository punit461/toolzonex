import type { Metadata } from "next";
import TimeZoneConverter from "../../../calculators/TimeZoneConverter";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://punit461.github.io/toolzonex';

export const metadata: Metadata = {
  title: "Time Zone Converter - Convert Local Time Globally",
  description: "Convert your local time to global timezones instantly. Free online time zone calculator for international scheduling.",
  keywords: ["time zone converter", "world clock", "convert time", "est to ist", "pst to gmt"],
  alternates: { canonical: "/utilities/time-zone-converter" },
  openGraph: {
    title: "Time Zone Converter - Convert Local Time Globally | ToolZoneX",
    description: "Convert your local time to global timezones instantly.",
    url: `${SITE_URL}/utilities/time-zone-converter`,
    type: "article",
  },
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Time Zone Converter",
  "description": "Convert your local time to global timezones instantly.",
  "url": `${SITE_URL}/utilities/time-zone-converter`,
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
      <TimeZoneConverter />
    </>
  );
}
