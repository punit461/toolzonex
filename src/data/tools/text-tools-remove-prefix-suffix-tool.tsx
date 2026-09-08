import ContentCutIcon from '@mui/icons-material/ContentCut';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/text-tools/remove-prefix-suffix-tool",
    navName: "Remove Prefix & Suffix Tool",
    navDescription: "Strip a prefix and/or suffix from lines that have it.",
    name: "Remove Prefix & Suffix Tool",
    description: "Remove a specified prefix and/or suffix from every line that actually starts or ends with it, leaving other lines unchanged.",
    navCategory: "Text Tools",
    shellCategory: "Text Tools",
    icon: <ContentCutIcon fontSize="large" color="primary"/>,
    seoTitle: "Remove Prefix & Suffix Tool - Clean Up List Lines Online",
    seoDescription: "Remove a specified prefix and/or suffix from every line that actually starts or ends with it, leaving other lines unchanged. Free and instant.",
    keywords: ["remove prefix from text", "remove suffix from text", "strip prefix suffix tool", "remove text from start of line", "remove text from end of line"],
    ogTitle: "Remove Prefix & Suffix Tool - Clean Up List Lines Online | ToolZoneX",
    ogDescription: "Remove a specified prefix and/or suffix from every line that actually starts or ends with it.",
    schemaName: "Remove Prefix & Suffix Tool",
    schemaDescription: "Remove a specified prefix and/or suffix from every line that actually starts or ends with it, leaving other lines unchanged.",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: [{ question: "How is this different from the Line Prefix & Suffix Tool?", answer: "The Line Prefix & Suffix Tool ADDS text to the beginning and/or end of every line. This tool does the reverse — it REMOVES a specified prefix and/or suffix, but only from the lines that actually have it, leaving every other line untouched." }, { question: "What happens if a line doesn't start with the prefix I entered?", answer: "That line is left completely unchanged — the removal only applies to lines that actually match, so you never risk accidentally cutting text off lines that don't have the prefix or suffix." }, { question: "Is the match case-sensitive?", answer: "Yes — the prefix and suffix must match the line's text exactly, including capitalization, for the removal to apply." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
