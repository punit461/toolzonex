import SortIcon from '@mui/icons-material/Sort';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/text-tools/alphabetical-sorter",
    navName: "Alphabetical Sorter",
    navDescription: "Sort a list A-Z or Z-A.",
    name: "Alphabetical Sorter",
    description: "Sort a list of items alphabetically (A-Z or Z-A), one item per line or comma-separated, with case-sensitive or case-insensitive sorting.",
    navCategory: "Text Tools",
    shellCategory: "Text Tools",
    icon: <SortIcon fontSize="large" color="primary"/>,
    seoTitle: "Alphabetical Sorter - Sort a List A-Z or Z-A Online",
    seoDescription: "Sort a list of items alphabetically (A-Z or Z-A), one item per line or comma-separated, with case-sensitive or case-insensitive sorting.",
    keywords: ["alphabetical sorter", "sort list alphabetically online", "sort text a-z", "alphabetize list"],
    ogTitle: "Alphabetical Sorter - Sort a List A-Z or Z-A Online | ToolZoneX",
    ogDescription: "Sort a list of items alphabetically, one item per line or comma-separated.",
    schemaName: "Alphabetical Sorter",
    schemaDescription: "Sort a list of items alphabetically (A-Z or Z-A), one item per line or comma-separated, with case-sensitive or case-insensitive sorting.",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: [{ question: "Can I sort a comma-separated list instead of one item per line?", answer: "Yes — choose \"Comma-Separated\" from the list format dropdown, and the tool splits, sorts, and rejoins the items with commas instead of line breaks." }, { question: "Does it remove blank lines or extra spaces?", answer: "Yes — empty items are dropped, and leading/trailing spaces on each item are trimmed before sorting." }, { question: "How does case-sensitive sorting order uppercase and lowercase?", answer: "Case-sensitive sorting uses standard character codes, where all uppercase letters (A-Z) come before any lowercase letters (a-z) — so \"Zebra\" sorts before \"apple\" even though Z comes after A alphabetically in everyday terms." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
