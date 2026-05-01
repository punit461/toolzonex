import type { Metadata } from "next";
import BlogList from "../../pages/BlogList";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://punit461.github.io/toolzonex';

export const metadata: Metadata = {
  title: "Personal Finance & Health Blog - Expert Guides & Tips",
  description: "Expert guides and tips on taxation, saving, investments, PPF, SIP, income tax, budgeting, and health. Stay informed with our comprehensive financial and wellness articles.",
  keywords: ["personal finance blog", "investment tips", "tax guide", "PPF guide", "SIP guide", "budgeting tips", "health tips", "India finance blog"],
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Personal Finance & Health Blog - Expert Guides & Tips | ToolZoneX",
    description: "Expert guides and tips on taxation, saving, investments, and health.",
    url: `${SITE_URL}/blog`,
    type: "website",
  },
};

const blogListingSchema = {
  "@context": "https://schema.org",
  "@type": "Blog",
  "name": "ToolZoneX Blog",
  "description": "Expert guides and tips on taxation, saving, investments, and health.",
  "url": `${SITE_URL}/blog`,
  "publisher": {
    "@type": "Organization",
    "name": "ToolZoneX",
    "url": SITE_URL
  }
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogListingSchema) }}
      />
      <BlogList />
    </>
  );
}
