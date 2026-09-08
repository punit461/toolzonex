import SmartToyIcon from '@mui/icons-material/SmartToy';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/ai/llm-cost-calculator",
    navName: "LLM API Cost Calculator",
    navDescription: "Estimate GPT, Claude & Gemini token costs.",
    name: "LLM API Cost Calculator",
    description: "Estimate the cost of GPT, Claude, and Gemini API calls from token counts, and compare pricing across models.",
    navCategory: "AI",
    shellCategory: "AI",
    icon: <SmartToyIcon fontSize="large" color="primary"/>,
    seoTitle: "LLM Cost Calculator — GPT, Claude & Gemini",
    seoDescription: "Free calculator to estimate GPT-4o, Claude, and Gemini API costs from token counts. Compare pricing across models and project monthly spend.",
    keywords: ["LLM cost calculator", "GPT API pricing", "Claude API cost", "Gemini API pricing", "token cost calculator", "AI API pricing", "OpenAI cost calculator", "LLM token calculator"],
    ogTitle: "LLM Cost Calculator — GPT, Claude & Gemini Pricing | ToolZoneX",
    ogDescription: "Estimate GPT-4o, Claude, and Gemini API costs from token counts. Compare pricing across models and project monthly spend.",
    schemaName: "LLM API Cost Calculator",
    schemaDescription: "Estimate the cost of GPT, Claude, and Gemini API calls from token counts, and compare pricing across models.",
    applicationCategory: "DeveloperApplication",
    currency: "USD",
    faqs: undefined,
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
