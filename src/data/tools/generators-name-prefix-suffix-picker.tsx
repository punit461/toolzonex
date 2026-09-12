import TagIcon from '@mui/icons-material/Tag';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/generators/name-prefix-suffix-picker",
    navName: "Name Prefix & Suffix Picker",
    navDescription: "Browse common name titles, prefixes & suffixes.",
    name: "Name Prefix & Suffix Picker - Titles, Prefixes & Suffixes",
    description: "Browse or search a reference of common name prefixes/titles (Mr., Dr., Rev.) and suffixes (Jr., PhD, Esq.), each with a brief usage note.",
    navCategory: "Generators",
    shellCategory: "Generators",
    icon: <TagIcon fontSize="large" color="primary"/>,
    seoTitle: "Name Prefix & Suffix Picker - Titles, Prefixes & Suffixes",
    seoDescription: "Free name prefix and suffix reference. Browse common titles like Mr., Dr., and Rev., plus suffixes like Jr., PhD, and Esq., with usage notes.",
    keywords: ["name prefix generator", "name suffix generator", "name titles list", "common name prefixes and suffixes", "honorific titles list"],
    ogTitle: "Name Prefix & Suffix Picker - Titles, Prefixes & Suffixes | ToolZoneX",
    ogDescription: "Browse common name titles, prefixes, and suffixes with usage notes.",
    schemaName: "Name Prefix & Suffix Picker",
    schemaDescription: "Browse or search a reference of common name prefixes/titles (Mr., Dr., Rev.) and suffixes (Jr., PhD, Esq.), each with a brief usage note.",
    applicationCategory: "UtilityApplication",
    currency: undefined,
    faqs: [{ question: "When should I use \"Dr.\" versus \"Prof.\"?", answer: "Use \"Dr.\" for anyone holding a doctoral degree or a practicing physician; use \"Prof.\" specifically for a university professor in an academic context, even if they also hold a doctorate — many professors are addressed as either, but \"Prof.\" is more precise in a teaching setting." }, { question: "What's the difference between \"Jr.\" and \"II\"?", answer: "\"Jr.\" specifically means a son who shares his father's exact full name, while \"II\" simply means the second person in a family line to carry that name, which doesn't have to be a direct father-son relationship." }, { question: "Can a name have both a prefix and a suffix?", answer: "Yes — for example, \"Dr. Jane Smith, PhD\" combines a professional prefix with an academic suffix, though repeating both a title and its corresponding degree suffix (like \"Dr.\" and \"MD\" together) is sometimes considered redundant in strict style guides." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
