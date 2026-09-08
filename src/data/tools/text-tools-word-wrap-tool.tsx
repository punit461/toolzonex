import TextFieldsIcon from '@mui/icons-material/TextFields';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/text-tools/word-wrap-tool",
    navName: "Word Wrap Tool",
    navDescription: "Wrap text to a column limit.",
    name: "Word Wrap Tool",
    description: "Automatically wrap text to a specific character limit or column width. Free online text formatter.",
    navCategory: "Text Tools",
    shellCategory: "Text Tools",
    icon: <TextFieldsIcon fontSize="large" color="primary"/>,
    seoTitle: "Word Wrap Tool - Wrap Text to Column Limit Online",
    seoDescription: "Automatically wrap text to a specific character limit or column width. Free online text formatter to fix long lines without breaking words.",
    keywords: ["word wrap tool", "wrap text online", "column limit formatter", "80 characters per line", "wrap long text lines", "wordwrap"],
    ogTitle: "Word Wrap Tool - Wrap Text to Column Limit Online | ToolZoneX",
    ogDescription: "Automatically wrap text to a specific character limit or column width.",
    schemaName: "Word Wrap Tool",
    schemaDescription: "Automatically wrap text to a specific character limit or column width.",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: [{ question: "Is this the same as a \"wordwrap\" tool?", answer: "Yes — \"wordwrap\" and \"word wrap\" both refer to automatically breaking long lines of text at a set character or column width, which is exactly what this tool does." }, { question: "Does it break words in the middle to fit the line length?", answer: "No — the tool wraps at word boundaries, so words are never split mid-word." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
