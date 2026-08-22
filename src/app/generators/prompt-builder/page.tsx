import type { Metadata } from "next";
import PromptBuilder from "../../../calculators/generators/PromptBuilder";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "AI Prompt Builder - Optimize ChatGPT & Claude Prompts",
  description: "Create optimized and structured prompts for ChatGPT, Claude, and Gemini to get better AI responses. Free prompt engineering tool.",
  keywords: ["prompt builder", "chatgpt prompt generator", "prompt engineering tool", "optimize ai prompts", "claude prompt maker"],
  alternates: { canonical: "/generators/prompt-builder" },
  openGraph: {
    title: "AI Prompt Builder - Optimize ChatGPT & Claude Prompts | ToolZoneX",
    description: "Create optimized and structured prompts for ChatGPT, Claude, and Gemini.",
    url: `${SITE_URL}/generators/prompt-builder`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "AI Prompt Builder",
  "description": "Create optimized and structured prompts for ChatGPT, Claude, and Gemini.",
  "url": `${SITE_URL}/generators/prompt-builder`,
  "applicationCategory": "UtilityApplication",
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
      <PromptBuilder />
    </>
  );
}
