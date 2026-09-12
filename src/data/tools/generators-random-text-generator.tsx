import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/generators/random-text-generator",
    navName: "Random Text Generator",
    navDescription: "Generate random words, sentences, or paragraphs.",
    name: "Random Text Generator",
    description: "Generate random English words, sentences, or paragraphs for lorem-style placeholder text. Free online random text generator.",
    navCategory: "Generators",
    shellCategory: "Generators",
    icon: <AutoAwesomeIcon fontSize="large" color="primary"/>,
    seoTitle: "Random Text Generator - Random Words, Sentences & Paragraphs",
    seoDescription: "Free online random text generator. Generate random English words, sentences, or paragraphs as filler content with copy support.",
    keywords: ["random text generator", "random words", "random sentences", "random paragraphs", "filler text generator"],
    ogTitle: "Random Text Generator - Random Words, Sentences & Paragraphs | ToolZoneX",
    ogDescription: "Generate random English words, sentences, or paragraphs.",
    schemaName: "Random Text Generator",
    schemaDescription: "Generate random English words, sentences, or paragraphs.",
    applicationCategory: "TextApplication",
    currency: "INR",
    faqs: undefined,
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
