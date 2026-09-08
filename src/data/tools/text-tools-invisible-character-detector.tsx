import FindInPageIcon from '@mui/icons-material/FindInPage';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/text-tools/invisible-character-detector",
    navName: "Invisible Character Detector",
    navDescription: "Find zero-width spaces, BOM & other hidden Unicode characters.",
    name: "Invisible Character Detector",
    description: "Scan text for exotic invisible Unicode characters — zero-width space, zero-width joiner/non-joiner, non-breaking space, BOM, soft hyphen, and word joiner — and highlight each one in place with a count by type.",
    navCategory: "Text Tools",
    shellCategory: "Text Tools",
    icon: <FindInPageIcon fontSize="large" color="primary"/>,
    seoTitle: "Invisible Character Detector - Find Hidden Unicode Characters",
    seoDescription: "Free invisible character detector. Scan text for zero-width spaces, non-breaking spaces, BOM, soft hyphens, and other hidden Unicode characters.",
    keywords: ["invisible character detector", "zero width space detector", "hidden unicode character finder", "find invisible characters", "non-breaking space detector"],
    ogTitle: "Invisible Character Detector - Find Hidden Unicode Characters | ToolZoneX",
    ogDescription: "Scan text for exotic invisible Unicode characters and highlight each one in place.",
    schemaName: "Invisible Character Detector",
    schemaDescription: "Scan text for exotic invisible Unicode characters — zero-width space, zero-width joiner/non-joiner, non-breaking space, BOM, soft hyphen, and word joiner — and highlight each one in place with a count by type.",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: [{ question: "How is this different from the Whitespace Cleaner?", answer: "The Whitespace Cleaner targets ordinary spaces, tabs, and empty lines — the whitespace you can usually see or expect. This tool detects exotic invisible Unicode characters, like zero-width spaces and the byte order mark, that are often invisible even when copy-pasted and can cause subtle bugs in URLs, code, or form inputs that regular whitespace cleaning won't catch." }, { question: "Does this tool remove the invisible characters it finds?", answer: "No — this tool only detects and highlights them for review without changing your text. Use the Unicode Space Remover to actually strip them out." }, { question: "Why would invisible characters cause bugs?", answer: "Characters like zero-width spaces or the BOM can silently break string comparisons, URL parsing, form validation, or code that expects plain ASCII, even though the text looks completely normal on screen." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
