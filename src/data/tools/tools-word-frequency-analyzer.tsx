import TextFieldsIcon from '@mui/icons-material/TextFields';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/tools/word-frequency-analyzer",
    navName: "Word Frequency",
    navDescription: "Find the most used words in text.",
    name: "Word Frequency Analyzer",
    description: "Find the most frequently used words in a text. Calculate keyword density and word counts instantly online.",
    navCategory: "Tools",
    shellCategory: "Tools",
    icon: <TextFieldsIcon fontSize="large" color="primary"/>,
    seoTitle: "Word Frequency Analyzer - Keyword Density Checker",
    seoDescription: "Find the most frequently used words in a text. Calculate keyword density and word counts instantly online.",
    keywords: ["word frequency analyzer", "keyword density checker", "word counter", "frequent words text analysis"],
    ogTitle: "Word Frequency Analyzer - Keyword Density Checker | ToolZoneX",
    ogDescription: "Find the most frequently used words in a text. Calculate keyword density and word counts instantly online.",
    schemaName: "Word Frequency Analyzer",
    schemaDescription: "Find the most frequently used words in a text. Calculate keyword density and word counts instantly online.",
    applicationCategory: "EducationalApplication",
    currency: "INR",
    faqs: undefined,
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
