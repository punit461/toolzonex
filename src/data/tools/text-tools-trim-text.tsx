import ContentCutIcon from '@mui/icons-material/ContentCut';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/text-tools/trim-text",
    navName: "Trim Text",
    navDescription: "Strip leading and trailing whitespace only.",
    name: "Trim Text - Strip Leading & Trailing Whitespace",
    description: "Strip only the leading and trailing whitespace from a block of text, without touching whitespace in the middle or offering extra cleaning options.",
    navCategory: "Text Tools",
    shellCategory: "Text Tools",
    icon: <ContentCutIcon fontSize="large" color="primary"/>,
    seoTitle: "Trim Text - Strip Leading & Trailing Whitespace",
    seoDescription: "Free online text trimmer. Strip only the leading and trailing whitespace from a block of text in one click, with no extra options.",
    keywords: ["trim text", "trim whitespace online", "strip leading and trailing spaces", "text trim tool", "remove spaces from start and end"],
    ogTitle: "Trim Text - Strip Leading & Trailing Whitespace | ToolZoneX",
    ogDescription: "Strip only the leading and trailing whitespace from a block of text, instantly.",
    schemaName: "Trim Text",
    schemaDescription: "Strip only the leading and trailing whitespace from a block of text, without touching whitespace in the middle or offering extra cleaning options.",
    applicationCategory: "UtilityApplication",
    currency: undefined,
    faqs: [{ question: "How is this different from the Whitespace Cleaner?", answer: "The Whitespace Cleaner is a full cleaning suite with several checkboxes — trimming each line, removing blank lines, collapsing multiple spaces, and converting tabs to spaces. This tool is deliberately minimal: it does exactly one thing, stripping only the leading and trailing whitespace from the entire input as a single block, for anyone who just wants that one specific operation without a menu of choices." }, { question: "Does this trim whitespace from every line, or just the ends?", answer: "Just the very start and very end of the whole input — not each individual line. If you need per-line trimming as well, use the Whitespace Cleaner instead." }, { question: "Does this collapse multiple spaces in the middle of my text?", answer: "No — only leading and trailing whitespace is removed. Spaces, tabs, and line breaks anywhere in the middle of your text are left exactly as you typed them." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
