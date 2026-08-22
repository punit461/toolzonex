import type { Metadata } from "next";
import LlmApiPricingGuide from "../../../components/pages/blogs/LlmApiPricingGuide";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "How Much Do LLM API Calls Actually Cost?",
  description: "LLM pricing splits input and output tokens, and the two rarely cost the same. Learn how OpenAI, Anthropic, and Google price their models and how to estimate your bill.",
  keywords: ["llm api pricing", "openai api cost", "claude api pricing", "gemini api pricing", "llm token cost", "ai api pricing guide"],
  alternates: { canonical: "/blog/llm-api-pricing-guide" },
  openGraph: {
    title: "How Much Do LLM API Calls Actually Cost? | ToolZoneX",
    description: "LLM pricing splits input and output tokens, and the two rarely cost the same — here's how to estimate your bill.",
    url: `${SITE_URL}/blog/llm-api-pricing-guide`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "How Much Do LLM API Calls Actually Cost? A Practical Guide",
  "description": "LLM pricing splits input and output tokens, and the two rarely cost the same. Learn how the major providers charge and how to estimate your bill.",
  "url": `${SITE_URL}/blog/llm-api-pricing-guide`,
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
      <LlmApiPricingGuide />
    </>
  );
}
