import type { Metadata } from "next";
import LLMCostCalculator from "../../../calculators/LLMCostCalculator";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "LLM API Cost Calculator - GPT, Claude & Gemini Token Pricing",
  description: "Free calculator to estimate GPT-4o, Claude, and Gemini API costs from token counts. Compare pricing across models and project monthly spend.",
  keywords: ["LLM cost calculator", "GPT API pricing", "Claude API cost", "Gemini API pricing", "token cost calculator", "AI API pricing", "OpenAI cost calculator", "LLM token calculator"],
  alternates: { canonical: "/ai/llm-cost-calculator" },
  openGraph: {
    title: "LLM API Cost Calculator - GPT, Claude & Gemini Token Pricing | ToolZoneX",
    description: "Estimate GPT-4o, Claude, and Gemini API costs from token counts. Compare pricing across models and project monthly spend.",
    url: `${SITE_URL}/ai/llm-cost-calculator`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
};

const llmCostCalculatorSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "LLM API Cost Calculator",
  "description": "Estimate the cost of GPT, Claude, and Gemini API calls from token counts, and compare pricing across models.",
  "url": `${SITE_URL}/ai/llm-cost-calculator`,
  "applicationCategory": "DeveloperApplication",
  "operatingSystem": "Web Browser",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(llmCostCalculatorSchema) }}
      />
      <LLMCostCalculator />
    </>
  );
}
