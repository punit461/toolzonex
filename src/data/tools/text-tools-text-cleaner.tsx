import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/text-tools/text-cleaner",
    navName: "Text Cleaner",
    navDescription: "Trim, collapse spaces, and fix quotes.",
    name: "Text Cleaner",
    description: "Clean up text with togglable options: trim whitespace, collapse spaces, remove line breaks, strip special characters, and normalize smart quotes.",
    navCategory: "Text Tools",
    shellCategory: "Text Tools",
    icon: <CleaningServicesIcon fontSize="large" color="primary"/>,
    seoTitle: "Text Cleaner - Trim, Collapse Spaces & Fix Quotes Online",
    seoDescription: "Clean up messy text with togglable options: trim whitespace, collapse spaces, remove line breaks, strip special characters, and normalize smart quotes.",
    keywords: ["text cleaner", "clean text online", "remove smart quotes", "normalize quotes", "trim whitespace tool", "text sanitizer"],
    ogTitle: "Text Cleaner - Trim, Collapse Spaces & Fix Quotes Online | ToolZoneX",
    ogDescription: "Clean up messy text with togglable trim, spacing, and quote-normalization options.",
    schemaName: "Text Cleaner",
    schemaDescription: "Clean up text with togglable options: trim whitespace, collapse spaces, remove line breaks, strip special characters, and normalize smart quotes.",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: [{ question: "Can I use only some of the cleanup options?", answer: "Yes — every checkbox is independent. Untick anything you don't want applied and only the checked options run when you click \"Clean Text\"." }, { question: "What counts as a \"special character\"?", answer: "With that option enabled, anything that isn't a letter, number, space, or basic punctuation (period, comma, exclamation mark, question mark, quotes, parentheses, hyphen) is removed." }, { question: "Why would I normalize smart quotes?", answer: "Word processors and phone keyboards often auto-replace straight quotes with curly \"smart\" quotes, which can break code syntax, CSV files, or systems that expect plain ASCII quotation marks." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
