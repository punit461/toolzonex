import type { Metadata } from "next";
import HashtagGenerator from "../../../calculators/HashtagGenerator";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://punit461.github.io/toolzonex';

export const metadata: Metadata = {
  title: "Hashtag Generator - Extract Tags from Text Online",
  description: "Extract keywords from text to generate SEO and social media hashtags instantly. Free online hashtag maker for Instagram and Twitter.",
  keywords: ["hashtag generator", "extract hashtags", "social media tags", "instagram hashtag maker", "seo tag generator"],
  alternates: { canonical: "/tools/hashtag-generator" },
  openGraph: {
    title: "Hashtag Generator - Extract Tags from Text Online | ToolZoneX",
    description: "Extract keywords from text to generate SEO and social media hashtags instantly.",
    url: `${SITE_URL}/tools/hashtag-generator`,
    type: "article",
  },
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Hashtag Generator",
  "description": "Extract keywords from text to generate SEO and social media hashtags instantly.",
  "url": `${SITE_URL}/tools/hashtag-generator`,
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
