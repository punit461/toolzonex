import CallSplitIcon from '@mui/icons-material/CallSplit';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/text-tools/name-splitter",
    navName: "Name Splitter",
    navDescription: "Split full names into first, middle, and last.",
    name: "Name Splitter - Split Full Names into First, Middle & Last",
    description: "Split a full name, or a bulk list of names one per line, into first name, middle name(s), and last name using simple space-based heuristics.",
    navCategory: "Text Tools",
    shellCategory: "Text Tools",
    icon: <CallSplitIcon fontSize="large" color="primary"/>,
    seoTitle: "Name Splitter - Split Full Names into First, Middle & Last",
    seoDescription: "Free online name splitter. Split a full name or a bulk list of names into first name, middle name(s), and last name instantly.",
    keywords: ["name splitter", "split full name", "first middle last name splitter", "parse names online", "split names in bulk"],
    ogTitle: "Name Splitter - Split Full Names into First, Middle & Last | ToolZoneX",
    ogDescription: "Split a full name, or a bulk list of names, into first, middle, and last name fields.",
    schemaName: "Name Splitter",
    schemaDescription: "Split a full name, or a bulk list of names one per line, into first name, middle name(s), and last name using simple space-based heuristics.",
    applicationCategory: "UtilityApplication",
    currency: undefined,
    faqs: [{ question: "Is this a definitive or perfectly accurate way to split names?", answer: "No — name parsing is inherently ambiguous. Many names and naming conventions around the world don't follow a simple \"first, middle, last\" pattern (for example, some cultures place the family name first, use multiple surnames, or have no middle name concept at all). This tool uses straightforward space-based heuristics rather than being a definitive solution, so always double-check the results for names that don't fit a typical Western first/middle/last structure." }, { question: "How are single-word names handled?", answer: "A single-word entry (like a mononym) is placed entirely in the first name field, with the middle and last name fields left blank." }, { question: "Can I process many names at once?", answer: "Yes — paste as many names as you like, one per line, and every line is split independently and shown as its own row in the results table." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
