import type { Metadata } from "next";
import SqlFormatter from "../../../calculators/developer-tools/SqlFormatter";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "SQL Formatter - Beautify SQL Online",
  description: "Format and beautify minified SQL queries online. Supports MySQL, PostgreSQL, SQL Server and SQLite.",
  keywords: ["sql formatter", "format sql online", "sql beautifier", "mysql formatter", "postgresql formatter"],
  alternates: { canonical: "/developer-tools/sql-formatter" },
  openGraph: {
    title: "SQL Formatter - Beautify SQL Online | ToolZoneX",
    description: "Format and beautify minified SQL queries online. Supports MySQL, PostgreSQL, SQL Server and SQLite.",
    url: `${SITE_URL}/developer-tools/sql-formatter`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "SQL Formatter",
  "description": "Format and beautify minified SQL queries online.",
  "url": `${SITE_URL}/developer-tools/sql-formatter`,
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
      <SqlFormatter />
    </>
  );
}
