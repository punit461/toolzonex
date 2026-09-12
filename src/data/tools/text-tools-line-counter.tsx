import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/text-tools/line-counter",
    navName: "Line Counter",
    navDescription: "Count lines, words, and characters.",
    name: "Line Counter",
    description: "Count total and non-empty lines, words, characters, and bytes in your text in real time. Free online line counter.",
    navCategory: "Text Tools",
    shellCategory: "Text Tools",
    icon: <FormatListNumberedIcon fontSize="large" color="primary"/>,
    seoTitle: "Line Counter - Count Lines, Words & Characters Online",
    seoDescription: "Free online line counter. Paste text and instantly see total lines, non-empty lines, words, characters, and UTF-8 bytes update as you type.",
    keywords: ["line counter", "count lines", "count words", "character counter", "bytes counter", "online line counter"],
    ogTitle: "Line Counter - Count Lines, Words & Characters Online | ToolZoneX",
    ogDescription: "Count lines, words, characters, and bytes in your text in real time.",
    schemaName: "Line Counter",
    schemaDescription: "Count lines, words, characters, and bytes in your text in real time.",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: undefined,
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
