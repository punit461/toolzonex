import type { Metadata } from "next";
import SqlFormatter from "../../../calculators/SqlFormatter";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://punit461.github.io/toolzonex';

export const metadata: Metadata = {
  title: "SQL Formatter - Beautify SQL Online",
  description: "Format and beautify minified SQL queries online. Supports MySQL, PostgreSQL, SQL Server and SQLite.",
  keywords: ["sql formatter", "format sql online", "sql beautifier", "mysql formatter", "postgresql formatter"],
  alternates: { canonical: "/tools/sql-formatter" },
  openGraph: {
    title: "SQL Formatter - Beautify SQL Online | ToolZoneX",
    description: "Format and beautify minified SQL queries online. Supports MySQL, PostgreSQL, SQL Server and SQLite.",
    url: `${SITE_URL}/tools/sql-formatter`,
    type: "article",
  },
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "SQL Formatter",
  "description": "Format and beautify minified SQL queries online.",
  "url": `${SITE_URL}/tools/sql-formatter`,
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
