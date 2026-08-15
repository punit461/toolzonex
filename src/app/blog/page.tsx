import type { Metadata } from "next";
import BlogList from "../../views/BlogList";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "Personal Finance & Health Blog - Expert Guides & Tips",
  description: "Expert guides and tips on taxation, saving, investments, PPF, SIP, income tax, budgeting, and health.",
  keywords: ["personal finance blog", "investment tips", "tax guide", "PPF guide", "SIP guide", "budgeting tips", "health tips", "India finance blog"],
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Personal Finance & Health Blog - Expert Guides & Tips | ToolZoneX",
    description: "Expert guides and tips on taxation, saving, investments, and health.",
    url: `${SITE_URL}/blog`,
    type: "website",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
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
