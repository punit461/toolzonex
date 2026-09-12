import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/generators/never-have-i-ever-generator",
    navName: "Never Have I Ever Generator",
    navDescription: "Random party-game prompts.",
    name: "Never Have I Ever Generator - Mild & Family-Friendly",
    description: "Generate random, family-friendly \"Never have I ever...\" prompts one at a time for a classic party icebreaker game.",
    navCategory: "Generators",
    shellCategory: "Generators",
    icon: <QuestionAnswerIcon fontSize="large" color="primary"/>,
    seoTitle: "Never Have I Ever Generator - Family-Friendly Prompts",
    seoDescription: "Free Never Have I Ever generator. Get random, family-friendly prompts one at a time for a classic party icebreaker game with friends or family.",
    keywords: ["never have i ever generator", "never have i ever questions", "party game generator", "icebreaker game generator", "never have i ever prompts"],
    ogTitle: "Never Have I Ever Generator - Family-Friendly Prompts | ToolZoneX",
    ogDescription: "Generate random, family-friendly Never Have I Ever prompts for game night.",
    schemaName: "Never Have I Ever Generator",
    schemaDescription: "Generate random, family-friendly \"Never have I ever...\" prompts one at a time for a classic party icebreaker game.",
    applicationCategory: "LifestyleApplication",
    currency: "INR",
    faqs: [{ question: "Is this related to the Truth or Dare Generator?", answer: "Yes — it's part of the same family of party-game generators on this site, alongside Truth or Dare and Would You Rather, and follows the same simple one-prompt-at-a-time format." }, { question: "Is the content appropriate for all ages?", answer: "Yes — every prompt is written to be family-friendly and mild, consistent with the site's other party-game generators. There's no explicit or adult content." }, { question: "Can the same prompt come up twice in a row?", answer: "No — the generator always avoids repeating the immediately previous prompt, though the same prompt can reappear later in a longer session." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
