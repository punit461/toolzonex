import ContentCutIcon from '@mui/icons-material/ContentCut';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/text-tools/unicode-space-remover",
    navName: "Unicode Space Remover",
    navDescription: "Strip zero-width spaces, BOM & other hidden Unicode characters.",
    name: "Unicode Space Remover",
    description: "Remove exotic invisible Unicode characters — zero-width space, zero-width joiner/non-joiner, non-breaking space, BOM, soft hyphen, and word joiner — from text, with a removed-count and one-click copy.",
    navCategory: "Text Tools",
    shellCategory: "Text Tools",
    icon: <ContentCutIcon fontSize="large" color="primary"/>,
    seoTitle: "Unicode Space Remover - Strip Hidden Unicode Characters",
    seoDescription: "Free Unicode space remover. Strip zero-width spaces, non-breaking spaces, BOM, soft hyphens, and other hidden Unicode characters from text.",
    keywords: ["unicode space remover", "remove zero width space", "strip hidden unicode characters", "remove non-breaking space", "zero width character remover"],
    ogTitle: "Unicode Space Remover - Strip Hidden Unicode Characters | ToolZoneX",
    ogDescription: "Strip exotic invisible Unicode characters from text with one click.",
    schemaName: "Unicode Space Remover",
    schemaDescription: "Remove exotic invisible Unicode characters — zero-width space, zero-width joiner/non-joiner, non-breaking space, BOM, soft hyphen, and word joiner — from text, with a removed-count and one-click copy.",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: [{ question: "How is this different from the Invisible Character Detector?", answer: "The Invisible Character Detector only highlights and flags these characters in place for review, without altering your text. This tool actually removes them and gives you back cleaned, ready-to-use text." }, { question: "Will this remove ordinary spaces and tabs too?", answer: "No — it only targets exotic invisible Unicode characters like zero-width spaces and the BOM. For ordinary spaces, tabs, and empty lines, use the Whitespace Cleaner instead." }, { question: "Is my text saved anywhere?", answer: "No — everything happens in your browser only; nothing is uploaded or stored anywhere." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
