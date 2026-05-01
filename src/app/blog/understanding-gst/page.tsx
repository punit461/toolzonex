import type { Metadata } from "next";
import GstImpact from "../../../pages/blogs/GstImpact";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://punit461.github.io/toolzonex';

export const metadata: Metadata = {
  title: "Understanding GST in India - Complete Guide to GST Slabs & Impact",
  description: "A simple guide to GST slabs, calculations, and its impact on consumers. Understand how GST affects prices and how to calculate GST on any product or service.",
  keywords: ["GST India", "GST slabs", "GST calculation", "GST impact", "goods and services tax", "GST rate", "GST on products", "GST guide"],
  alternates: { canonical: "/blog/understanding-gst" },
  openGraph: {
    title: "Understanding GST in India - Complete Guide | ToolZoneX",
    description: "A simple guide to GST slabs, calculations, and its impact on consumers.",
    url: `${SITE_URL}/blog/understanding-gst`,
    type: "article",
  },
};

const gstSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Understanding GST in India - Complete Guide to GST Slabs & Impact",
  "description": "A simple guide to GST slabs, calculations, and its impact on consumers.",
  "url": `${SITE_URL}/blog/understanding-gst`,
  "datePublished": "2025-02-05",
  "dateModified": "2025-02-05",
  "author": { "@type": "Organization", "name": "ToolZoneX" },
  "publisher": {
    "@type": "Organization",
    "name": "ToolZoneX",
    "logo": { "@type": "ImageObject", "url": `${SITE_URL}/toolzonex/logo.png` }
  }
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(gstSchema) }}
      />
      <GstImpact />
    </>
  );
}
