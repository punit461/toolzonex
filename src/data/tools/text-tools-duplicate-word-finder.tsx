import TextFieldsIcon from '@mui/icons-material/TextFields';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/text-tools/duplicate-word-finder",
    navName: "Duplicate Word Finder",
    navDescription: "Find duplicate words in text.",
    name: "Duplicate Word Finder",
    description: "Find repeated words in your text to improve your writing and vocabulary. Free online duplicate word checker.",
    navCategory: "Text Tools",
    shellCategory: "Text Tools",
    icon: <TextFieldsIcon fontSize="large" color="primary"/>,
    seoTitle: "Duplicate Word Finder - Find Repeated Words Online",
    seoDescription: "Find repeated words in your text to improve your writing and vocabulary. Free online duplicate word checker and frequency counter.",
    keywords: ["duplicate word finder", "find repeated words", "word frequency counter", "overused words checker", "writing improvement tool"],
    ogTitle: "Duplicate Word Finder - Find Repeated Words Online | ToolZoneX",
    ogDescription: "Find repeated words in your text to improve your writing and vocabulary. Free online duplicate word checker.",
    schemaName: "Duplicate Word Finder",
    schemaDescription: "Find repeated words in your text to improve your writing and vocabulary.",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: undefined,
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
