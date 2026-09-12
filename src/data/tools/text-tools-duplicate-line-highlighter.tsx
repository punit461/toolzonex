import FindReplaceIcon from '@mui/icons-material/FindReplace';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/text-tools/duplicate-line-highlighter",
    navName: "Duplicate Line Highlighter",
    navDescription: "Visually flag duplicate lines without deleting them.",
    name: "Duplicate Line Highlighter",
    description: "Highlight every line that appears more than once in text, without removing or altering anything, with a duplicate count.",
    navCategory: "Text Tools",
    shellCategory: "Text Tools",
    icon: <FindReplaceIcon fontSize="large" color="primary"/>,
    seoTitle: "Duplicate Line Highlighter - Spot Repeats Before Cleaning",
    seoDescription: "Highlight every line that appears more than once in text, without removing or altering anything, with a duplicate count. Free online tool.",
    keywords: ["duplicate line highlighter", "find duplicate lines", "highlight repeated lines", "spot duplicate rows", "duplicate lines checker"],
    ogTitle: "Duplicate Line Highlighter - Spot Repeats Before Cleaning | ToolZoneX",
    ogDescription: "Highlight every line that appears more than once in text, without removing or altering anything.",
    schemaName: "Duplicate Line Highlighter",
    schemaDescription: "Highlight every line that appears more than once in text, without removing or altering anything, with a duplicate count.",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: [{ question: "How is this different from Remove Duplicate Lines?", answer: "Remove Duplicate Lines DELETES duplicate lines automatically, keeping only the first occurrence. This tool just visually flags duplicates in place, leaving every line untouched, so you can review them before deciding what — if anything — to do." }, { question: "Are empty lines treated as duplicates?", answer: "No — blank lines are never highlighted, even if there are several in a row, since flagging every blank line as a duplicate usually isn't useful." }, { question: "Is the comparison case-sensitive?", answer: "Yes — lines are compared exactly as typed, so \"Apple\" and \"apple\" are treated as different lines and won't be flagged as duplicates of each other." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
