import FormatLineSpacingIcon from '@mui/icons-material/FormatLineSpacing';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/text-tools/consecutive-space-finder",
    navName: "Consecutive Space Finder",
    navDescription: "Visually flag runs of extra spaces without removing them.",
    name: "Consecutive Space Finder",
    description: "Highlight every run of two or more consecutive spaces in text, without altering the text at all, with a run count.",
    navCategory: "Text Tools",
    shellCategory: "Text Tools",
    icon: <FormatLineSpacingIcon fontSize="large" color="primary"/>,
    seoTitle: "Consecutive Space Finder - Spot Double Spaces Before Cleaning",
    seoDescription: "Highlight every run of two or more consecutive spaces in text, without altering the text at all, with a run count. Free online tool.",
    keywords: ["consecutive space finder", "find double spaces", "highlight extra spaces", "double space checker", "multiple spaces finder"],
    ogTitle: "Consecutive Space Finder - Spot Double Spaces Before Cleaning | ToolZoneX",
    ogDescription: "Highlight every run of two or more consecutive spaces in text, without altering the text at all.",
    schemaName: "Consecutive Space Finder",
    schemaDescription: "Highlight every run of two or more consecutive spaces in text, without altering the text at all, with a run count.",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: [{ question: "How is this different from the Whitespace Cleaner?", answer: "The Whitespace Cleaner REMOVES extra whitespace automatically, collapsing multiple spaces down to one. This tool only visually flags where consecutive spaces occur, leaving the text completely unchanged, so you can review it first before deciding whether to clean it." }, { question: "Does this catch tabs or line breaks too?", answer: "No — it specifically looks for runs of two or more regular space characters; tabs and line breaks are treated as separate characters and aren't flagged by this tool." }, { question: "Does a single space between words get highlighted?", answer: "No — only runs of two or more consecutive spaces are highlighted; normal single-space word spacing is left alone." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
