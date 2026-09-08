import TextFormatIcon from '@mui/icons-material/TextFormat';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/generators/prompt-builder",
    navName: "Prompt Builder",
    navDescription: "Optimize ChatGPT prompts.",
    name: "AI Prompt Builder",
    description: "Create optimized and structured prompts for ChatGPT, Claude, and Gemini to get better AI responses.",
    navCategory: "Generators",
    shellCategory: "Generators",
    icon: <TextFormatIcon fontSize="large" color="primary"/>,
    seoTitle: "AI Prompt Builder - Optimize ChatGPT & Claude Prompts",
    seoDescription: "Create optimized and structured prompts for ChatGPT, Claude, and Gemini to get better AI responses. Free prompt engineering tool.",
    keywords: ["prompt builder", "chatgpt prompt generator", "prompt engineering tool", "optimize ai prompts", "claude prompt maker"],
    ogTitle: "AI Prompt Builder - Optimize ChatGPT & Claude Prompts | ToolZoneX",
    ogDescription: "Create optimized and structured prompts for ChatGPT, Claude, and Gemini.",
    schemaName: "AI Prompt Builder",
    schemaDescription: "Create optimized and structured prompts for ChatGPT, Claude, and Gemini.",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: undefined,
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
