import type { Metadata } from "next";
import HashtagGenerator from "../../../calculators/generators/HashtagGenerator";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "Hashtag Generator - Extract Tags from Text Online",
  description: "Extract keywords from text to generate SEO and social media hashtags instantly. Free online hashtag maker for Instagram and Twitter.",
  keywords: ["hashtag generator", "extract hashtags", "social media tags", "instagram hashtag maker", "seo tag generator"],
  alternates: { canonical: "/generators/hashtag-generator" },
  openGraph: {
    title: "Hashtag Generator - Extract Tags from Text Online | ToolZoneX",
    description: "Extract keywords from text to generate SEO and social media hashtags instantly.",
    url: `${SITE_URL}/generators/hashtag-generator`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Hashtag Generator",
  "description": "Extract keywords from text to generate SEO and social media hashtags instantly.",
  "url": `${SITE_URL}/generators/hashtag-generator`,
  "applicationCategory": "SocialNetworkingApplication",
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
      <HashtagGenerator />
    </>
  );
}
