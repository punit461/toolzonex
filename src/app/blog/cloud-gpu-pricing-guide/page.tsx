import type { Metadata } from "next";
import CloudGpuPricingGuide from "../../../views/blogs/CloudGpuPricingGuide";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "Cloud GPU Pricing Explained: Community Cloud vs. Hyperscalers",
  description: "The same GPU can cost 3x more depending on where you rent it. Learn why cloud GPU pricing varies so much and how to think about the tradeoff between community clouds and hyperscalers.",
  keywords: ["cloud gpu pricing", "gpu rental cost", "h100 pricing", "a100 pricing", "gpu cloud comparison", "cloud gpu cost guide"],
  alternates: { canonical: "/blog/cloud-gpu-pricing-guide" },
  openGraph: {
    title: "Cloud GPU Pricing Explained: Community Cloud vs. Hyperscalers | ToolZoneX",
    description: "The same GPU can cost 3x more depending on where you rent it — here's why, and how to think about the tradeoff.",
    url: `${SITE_URL}/blog/cloud-gpu-pricing-guide`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Cloud GPU Pricing Explained: Community Cloud vs. Hyperscalers",
  "description": "The same GPU can cost 3x more depending on where you rent it. Learn why cloud GPU pricing varies so much and how to think about the tradeoff.",
  "url": `${SITE_URL}/blog/cloud-gpu-pricing-guide`,
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
      <CloudGpuPricingGuide />
    </>
  );
}
