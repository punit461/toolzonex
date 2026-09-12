import SortIcon from '@mui/icons-material/Sort';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/text-tools/alphabet-index-generator",
    navName: "Alphabet Index Generator",
    navDescription: "Group a list alphabetically under A-Z headers.",
    name: "Alphabet Index Generator - A-Z Grouped List",
    description: "Group a list of terms or names alphabetically under A-Z section headers, showing only letters with matching entries, sorted within each group.",
    navCategory: "Text Tools",
    shellCategory: "Text Tools",
    icon: <SortIcon fontSize="large" color="primary"/>,
    seoTitle: "Alphabet Index Generator - A-Z Grouped List",
    seoDescription: "Free online alphabet index generator. Group a list of terms or names alphabetically under A-Z headers for a glossary, index, or directory.",
    keywords: ["alphabet index generator", "alphabetical list generator", "a-z index generator", "glossary index generator", "alphabetize a list online"],
    ogTitle: "Alphabet Index Generator - A-Z Grouped List | ToolZoneX",
    ogDescription: "Group a list of terms or names alphabetically under A-Z section headers.",
    schemaName: "Alphabet Index Generator",
    schemaDescription: "Group a list of terms or names alphabetically under A-Z section headers, showing only letters with matching entries, sorted within each group.",
    applicationCategory: "UtilityApplication",
    currency: undefined,
    faqs: [{ question: "What happens to entries that don't start with a letter?", answer: "Entries starting with a number or symbol are grouped together under a single \"#\" section placed at the end of the index." }, { question: "Is the grouping case-sensitive?", answer: "No — grouping and sorting both ignore case, so \"apple\" and \"Apple\" are grouped and sorted together as if identically cased." }, { question: "Are duplicate entries removed?", answer: "No — every line you enter appears in the index exactly once per occurrence; run a duplicate-removal tool first if you want only unique entries." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
