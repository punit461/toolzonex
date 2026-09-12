import ContentCutIcon from '@mui/icons-material/ContentCut';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/text-tools/file-name-shortener",
    navName: "File Name Shortener",
    navDescription: "Shorten long file names while keeping the extension.",
    name: "File Name Shortener",
    description: "Truncate long file names to fit a max length, preserving the file extension intact, with an ellipsis inserted into the shortened base name.",
    navCategory: "Text Tools",
    shellCategory: "Text Tools",
    icon: <ContentCutIcon fontSize="large" color="primary"/>,
    seoTitle: "File Name Shortener - Shorten Long File Names",
    seoDescription: "Free online file name shortener. Truncate long file names to a max length while always keeping the file extension intact.",
    keywords: ["file name shortener", "shorten file name", "truncate file name", "long file name fix", "file name length limit"],
    ogTitle: "File Name Shortener - Shorten Long File Names | ToolZoneX",
    ogDescription: "Truncate long file names to a max length while keeping the extension intact.",
    schemaName: "File Name Shortener",
    schemaDescription: "Truncate long file names to fit a max length, preserving the file extension intact, with an ellipsis inserted into the shortened base name.",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: [{ question: "How is this different from the File Name Cleaner?", answer: "File Name Cleaner sanitizes invalid characters and normalizes casing — a concern about which CHARACTERS are valid. This File Name Shortener addresses a completely different concern: file name LENGTH, truncating names that are simply too long regardless of whether their characters are valid." }, { question: "Is the file extension ever cut off?", answer: "No — the extension is always preserved in full; only the base name (everything before the last dot) is shortened to make room within the max length." }, { question: "What happens if the extension itself is longer than the max length?", answer: "In that rare edge case, there isn't enough room to keep the extension intact and add an ellipsis meaningfully, so the tool falls back to a simple hard truncation of the whole name to the max length." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
