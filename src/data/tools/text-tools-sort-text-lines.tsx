import SortIcon from '@mui/icons-material/Sort';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/text-tools/sort-text-lines",
    navName: "Sort Text Lines",
    navDescription: "Sort lines alphabetically, numerically, or by length.",
    name: "Sort Text Lines",
    description: "Sort a list of lines alphabetically, numerically (parsing each line as a number), or by length, with case-insensitive and remove-duplicates options.",
    navCategory: "Text Tools",
    shellCategory: "Text Tools",
    icon: <SortIcon fontSize="large" color="primary"/>,
    seoTitle: "Sort Text Lines - Alphabetical & Numerical Line Sorter",
    seoDescription: "Free online tool to sort text lines alphabetically, numerically, or by length. Remove duplicates and sort case-insensitively.",
    keywords: ["sort text lines", "sort lines alphabetically", "numerical sort online", "sort lines by length", "remove duplicate lines and sort"],
    ogTitle: "Sort Text Lines - Alphabetical & Numerical Line Sorter | ToolZoneX",
    ogDescription: "Sort a list of lines alphabetically, numerically, or by length, with remove-duplicates support.",
    schemaName: "Sort Text Lines",
    schemaDescription: "Sort a list of lines alphabetically, numerically (parsing each line as a number), or by length, with case-insensitive and remove-duplicates options.",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: [{ question: "Why does numerical sorting matter if I could just sort alphabetically?", answer: "Plain text (lexicographic) sorting compares numbers character by character, so \"10\" is treated as coming before \"2\" because the character 1 is less than 2. Numerical mode instead parses each line into an actual number first, giving the mathematically correct order." }, { question: "What happens to lines that aren't valid numbers in Numerical mode?", answer: "Lines that can't be parsed as a number are pushed to the end of the ascending order (or the start in descending order), so your numeric lines still sort correctly among themselves." }, { question: "Does Remove Duplicates consider case?", answer: "Duplicate removal is exact-match — Apple and apple are treated as different lines unless they match exactly, so combine it with lowercase text beforehand if you need case-insensitive de-duplication." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
