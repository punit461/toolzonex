import type { Metadata } from "next";
import CronJobParser from "../../../calculators/CronJobParser";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://punit461.github.io/toolzonex';

export const metadata: Metadata = {
  title: "Cron Job Parser - Cron to English Online",
  description: "Translate Cron expressions into human-readable plain English instantly. Free online cron parser.",
  keywords: ["cron job parser", "cron to english", "cron expression reader", "cron translator", "explain cron job"],
  alternates: { canonical: "/tools/cron-job-parser" },
  openGraph: {
    title: "Cron Job Parser - Cron to English Online | ToolZoneX",
    description: "Translate Cron expressions into human-readable plain English instantly. Free online cron parser.",
    url: `${SITE_URL}/tools/cron-job-parser`,
    type: "article",
  },
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Cron Job Parser",
  "description": "Translate Cron expressions into human-readable plain English instantly.",
  "url": `${SITE_URL}/tools/cron-job-parser`,
  "applicationCategory": "DeveloperApplication",
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
      <CronJobParser />
    </>
  );
}
