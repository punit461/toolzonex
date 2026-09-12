import FormatLineSpacingIcon from '@mui/icons-material/FormatLineSpacing';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/text-tools/remove-empty-lines",
    navName: "Remove Empty Lines",
    navDescription: "Strip blank and whitespace-only lines.",
    name: "Remove Empty Lines",
    description: "Remove all blank and whitespace-only lines from text, live as you type.",
    navCategory: "Text Tools",
    shellCategory: "Text Tools",
    icon: <FormatLineSpacingIcon fontSize="large" color="primary"/>,
    seoTitle: "Remove Empty Lines from Text Online",
    seoDescription: "Remove all blank and whitespace-only lines from text instantly. Free online tool, updates live as you type.",
    keywords: ["remove empty lines", "remove blank lines online", "strip blank lines", "delete empty lines from text"],
    ogTitle: "Remove Empty Lines from Text Online | ToolZoneX",
    ogDescription: "Remove all blank and whitespace-only lines from text instantly.",
    schemaName: "Remove Empty Lines",
    schemaDescription: "Remove all blank and whitespace-only lines from text, live as you type.",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: [{ question: "Does it remove lines with only spaces or tabs?", answer: "Yes — a line is treated as empty if it contains nothing, or only whitespace characters like spaces and tabs, and is removed either way." }, { question: "Will this affect intentional paragraph spacing?", answer: "Yes — since every blank line is removed, paragraphs separated by a single blank line will end up directly adjacent. If you need to preserve paragraph breaks, keep one non-blank marker line between them before running this tool." }, { question: "Does this update as I type?", answer: "Yes — there's no button to click. The cleaned result and the count of removed lines update instantly as you edit the text." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
