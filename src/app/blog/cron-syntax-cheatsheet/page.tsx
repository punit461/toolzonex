import type { Metadata } from "next";
import CronSyntaxCheatsheet from "../../../views/blogs/CronSyntaxCheatsheet";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "Cron Syntax Cheatsheet: How to Read Any Crontab Schedule",
  description: "Five fields, one order, and a handful of special characters — a complete reference for reading and writing cron expressions, including the day-of-month/day-of-week gotcha.",
  keywords: ["cron syntax", "crontab cheatsheet", "cron expression guide", "how to read cron", "cron schedule examples", "kubernetes cronjob syntax"],
  alternates: { canonical: "/blog/cron-syntax-cheatsheet" },
  openGraph: {
    title: "Cron Syntax Cheatsheet: How to Read Any Crontab Schedule | ToolZoneX",
    description: "Five fields, one order — a complete reference for reading and writing cron expressions.",
    url: `${SITE_URL}/blog/cron-syntax-cheatsheet`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Cron Syntax Cheatsheet: How to Read Any Crontab Schedule",
  "description": "Five fields, one order, and a handful of special characters — a complete reference for reading and writing cron expressions, including the day-of-month/day-of-week gotcha.",
  "url": `${SITE_URL}/blog/cron-syntax-cheatsheet`,
  "datePublished": "2026-08-22",
  "dateModified": "2026-08-22",
  "author": { "@type": "Organization", "name": "ToolZoneX" },
  "publisher": {
    "@type": "Organization",
    "name": "ToolZoneX",
    "logo": { "@type": "ImageObject", "url": `${SITE_URL}/logo.png` }
  }
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <CronSyntaxCheatsheet />
    </>
  );
}
