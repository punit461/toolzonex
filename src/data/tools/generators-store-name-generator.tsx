import StorefrontIcon from '@mui/icons-material/Storefront';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/generators/store-name-generator",
    navName: "Store Name Generator",
    navDescription: "Random shop names by niche.",
    name: "Store Name Generator - Fashion, Food, Tech & More",
    description: "Generate random store or shop name ideas by niche — Fashion, Food, Tech, or General — combining relevant word lists per category.",
    navCategory: "Generators",
    shellCategory: "Generators",
    icon: <StorefrontIcon fontSize="large" color="primary"/>,
    seoTitle: "Store Name Generator - Fashion, Food & Tech",
    seoDescription: "Generate random store or shop name ideas by niche — Fashion, Food, Tech, or General. Free online tool, five suggestions per click.",
    keywords: ["store name generator", "shop name generator", "business name generator by niche", "boutique name generator"],
    ogTitle: "Store Name Generator - Fashion, Food & Tech | ToolZoneX",
    ogDescription: "Generate random store or shop name ideas by niche — Fashion, Food, Tech, or General.",
    schemaName: "Store Name Generator",
    schemaDescription: "Generate random store or shop name ideas by niche — Fashion, Food, Tech, or General — combining relevant word lists per category.",
    applicationCategory: "BusinessApplication",
    currency: "INR",
    faqs: [{ question: "Are these names checked for availability?", answer: "No — this tool only generates random word combinations for inspiration. Always check domain availability and trademark registries before committing to a name." }, { question: "Can I combine words from different suggestions?", answer: "Yes — feel free to mix the first word from one suggestion with the second word from another." }, { question: "Can I generate names for a niche not listed?", answer: "Try the \"General\" niche for broadly applicable names, or use a specific niche as a starting point and adapt the result." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
