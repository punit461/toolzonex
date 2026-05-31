import type { Metadata } from "next";
import PromptBuilder from "../../../calculators/PromptBuilder";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://punit461.github.io/toolzonex';

export const metadata: Metadata = {
  title: "AI Prompt Builder - Optimize ChatGPT & Claude Prompts",
  description: "Create optimized and structured prompts for ChatGPT, Claude, and Gemini to get better AI responses. Free prompt engineering tool.",
  keywords: ["prompt builder", "chatgpt prompt generator", "prompt engineering tool", "optimize ai prompts", "claude prompt maker"],
  alternates: { canonical: "/tools/prompt-builder" },
  openGraph: {
    title: "AI Prompt Builder - Optimize ChatGPT & Claude Prompts | ToolZoneX",
    description: "Create optimized and structured prompts for ChatGPT, Claude, and Gemini.",
    url: `${SITE_URL}/tools/prompt-builder`,
    type: "article",
  },
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "AI Prompt Builder",
  "description": "Create optimized and structured prompts for ChatGPT, Claude, and Gemini.",
  "url": `${SITE_URL}/tools/prompt-builder`,
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
