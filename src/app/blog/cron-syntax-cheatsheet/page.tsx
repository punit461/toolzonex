import type { Metadata } from "next";
import CronSyntaxCheatsheet from "../../../components/pages/blogs/CronSyntaxCheatsheet";
import { AUTHOR_PERSON_SCHEMA, ORGANIZATION_SAME_AS } from "../../../data/author";

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
  twitter: {
    card: "summary_large_image",
    title: "Cron Syntax Cheatsheet: How to Read Any Crontab Schedule | ToolZoneX",
    description: "Five fields, one order — a complete reference for reading and writing cron expressions.",
    images: [`${SITE_URL}/og-image.jpg`],
    creator: "@toolzonex",
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Cron Syntax Cheatsheet: How to Read Any Crontab Schedule",
  "description": "Five fields, one order, and a handful of special characters — a complete reference for reading and writing cron expressions, including the day-of-month/day-of-week gotcha.",
  "url": `${SITE_URL}/blog/cron-syntax-cheatsheet`,
  "image": [`${SITE_URL}/og-image.jpg`],
  "datePublished": "2026-08-22",
  "dateModified": "2026-08-22",
  "author": AUTHOR_PERSON_SCHEMA,
  "publisher": {
    "@type": "Organization",
    "name": "ToolZoneX",
    "logo": { "@type": "ImageObject", "url": `${SITE_URL}/logo.png` },
    "sameAs": ORGANIZATION_SAME_AS
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
