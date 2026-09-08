import JoinFullIcon from '@mui/icons-material/JoinFull';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/text-tools/delimiter-list-generator",
    navName: "Delimiter List Generator",
    navDescription: "Join or split a list using comma, pipe, or semicolon.",
    name: "Delimiter List Generator - Comma, Pipe & Semicolon Lists",
    description: "Join a one-item-per-line list into a single delimited string using comma, pipe, semicolon, or a custom delimiter, or split a delimited string back into a list.",
    navCategory: "Text Tools",
    shellCategory: "Text Tools",
    icon: <JoinFullIcon fontSize="large" color="primary"/>,
    seoTitle: "Delimiter List Generator - Comma, Pipe & Semicolon Lists",
    seoDescription: "Free online delimiter list generator. Join a list into a comma, pipe, or semicolon separated string, or split a delimited string back into a list.",
    keywords: ["delimiter list generator", "comma separated list generator", "pipe separated list generator", "semicolon list generator", "split delimited string online"],
    ogTitle: "Delimiter List Generator - Comma, Pipe & Semicolon Lists | ToolZoneX",
    ogDescription: "Join a list into a delimited string, or split a delimited string back into a list.",
    schemaName: "Delimiter List Generator",
    schemaDescription: "Join a one-item-per-line list into a single delimited string using comma, pipe, semicolon, or a custom delimiter, or split a delimited string back into a list.",
    applicationCategory: "UtilityApplication",
    currency: undefined,
    faqs: [{ question: "Can I use a delimiter that isn't comma, pipe, or semicolon?", answer: "Yes — select Custom and type any character or short string, such as a tab or a double colon, to use as the delimiter." }, { question: "Does the Split direction handle extra spaces around items?", answer: "Yes — each resulting item is trimmed of leading and trailing whitespace, so \"red, green,blue\" splits cleanly into three items regardless of inconsistent spacing." }, { question: "What happens to empty lines or empty items?", answer: "They're automatically filtered out in both directions, so blank lines in your list and empty items from consecutive delimiters don't appear in the result." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
