import QueryStatsIcon from '@mui/icons-material/QueryStats';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/text-tools/keyword-density-checker",
    navName: "Keyword Density Checker",
    navDescription: "Check keyword density & word frequency in text.",
    name: "Keyword Density Checker",
    description: "Check a target keyword's density and see the top 20 word frequencies in your article or webpage content.",
    navCategory: "Text Tools",
    shellCategory: "Text Tools",
    icon: <QueryStatsIcon fontSize="large" color="primary"/>,
    seoTitle: "Keyword Density Checker - Analyze Keyword & Word Frequency",
    seoDescription: "Free keyword density checker to analyze keyword occurrence, density percentage, and top 20 word frequencies in your article or blog content.",
    keywords: ["keyword density checker", "keyword density tool", "word frequency counter", "seo keyword checker", "keyword analyzer", "content keyword density"],
    ogTitle: "Keyword Density Checker - Analyze Keyword & Word Frequency | ToolZoneX",
    ogDescription: "Analyze keyword occurrence, density percentage, and top word frequencies in your content.",
    schemaName: "Keyword Density Checker",
    schemaDescription: "Check a target keyword's density and see the top 20 word frequencies in article or webpage content.",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: [{ question: "What is a good keyword density?", answer: "There is no universal ideal percentage. Aim for natural, readable content that addresses the user's intent rather than hitting a specific density number." }, { question: "Does this tool count stop words?", answer: "Stop words (like \"the\", \"and\", \"is\") are excluded from the top 20 frequency list to focus on meaningful keywords." }, { question: "Is keyword density still important for SEO?", answer: "It is one signal among many. Search engines prioritize content quality, relevance, and user experience over keyword density alone." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
