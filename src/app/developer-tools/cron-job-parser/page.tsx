import type { Metadata } from "next";
import CronJobParser from "../../../calculators/developer-tools/CronJobParser";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "Cron Job Parser - Cron to English Online",
  description: "Translate Cron expressions into human-readable plain English instantly. Free online cron parser.",
  keywords: ["cron job parser", "cron to english", "cron expression reader", "cron translator", "explain cron job"],
  alternates: { canonical: "/developer-tools/cron-job-parser" },
  openGraph: {
    title: "Cron Job Parser - Cron to English Online | ToolZoneX",
    description: "Translate Cron expressions into human-readable plain English instantly. Free online cron parser.",
    url: `${SITE_URL}/developer-tools/cron-job-parser`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Cron Job Parser",
  "description": "Translate Cron expressions into human-readable plain English instantly.",
  "url": `${SITE_URL}/developer-tools/cron-job-parser`,
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
