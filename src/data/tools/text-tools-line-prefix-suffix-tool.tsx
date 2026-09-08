import TextFieldsIcon from '@mui/icons-material/TextFields';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/text-tools/line-prefix-suffix-tool",
    navName: "Prefix & Suffix",
    navDescription: "Add prefix or suffix to lines.",
    name: "Line Prefix & Suffix Tool",
    description: "Add text to the beginning or end of every line instantly. Free online list formatting tool for developers.",
    navCategory: "Text Tools",
    shellCategory: "Text Tools",
    icon: <TextFieldsIcon fontSize="large" color="primary"/>,
    seoTitle: "Add Prefix & Suffix to Lines Online - Text Formatting Tool",
    seoDescription: "Add text to the beginning or end of every line instantly. Free online list formatting tool for developers to add prefixes or suffixes to text lists.",
    keywords: ["line prefix tool", "add prefix to text", "add suffix to text", "add text to each line", "format list online"],
    ogTitle: "Add Prefix & Suffix to Lines Online - Text Formatting Tool | ToolZoneX",
    ogDescription: "Add text to the beginning or end of every line instantly. Free online list formatting tool.",
    schemaName: "Line Prefix & Suffix Tool",
    schemaDescription: "Add text to the beginning or end of every line instantly.",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: [{ question: "How do I add a prefix to text?", answer: "Paste your text or list into the box, type the text you want at the start of every line into the \"Prefix\" field, and click \"Apply Prefix & Suffix\". To add a prefix to text without a suffix, just leave the suffix field empty." }, { question: "Can I add both a prefix and suffix at once?", answer: "Yes, set both fields and they'll be applied to every line simultaneously." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
