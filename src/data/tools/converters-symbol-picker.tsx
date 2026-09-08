import TextFormatIcon from '@mui/icons-material/TextFormat';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/converters/symbol-picker",
    navName: "Symbol Picker",
    navDescription: "Browse and copy common typographic symbols.",
    name: "Symbol Picker",
    description: "Browse around 80 commonly-needed typographic and technical symbols — legal, math, punctuation, arrows, Greek letters, and fractions — with click-to-copy.",
    navCategory: "Converters",
    shellCategory: "Converters",
    icon: <TextFormatIcon fontSize="large" color="primary"/>,
    seoTitle: "Symbol Picker - Copy Typographic & Technical Symbols",
    seoDescription: "Free online symbol picker. Browse and copy legal, math, punctuation, arrow, Greek, and fraction symbols — no emoji included.",
    keywords: ["symbol picker", "special character picker", "typographic symbols", "copy special symbols", "technical symbols list"],
    ogTitle: "Symbol Picker - Copy Typographic & Technical Symbols | ToolZoneX",
    ogDescription: "Browse and copy commonly-needed typographic and technical symbols.",
    schemaName: "Symbol Picker",
    schemaDescription: "Browse around 80 commonly-needed typographic and technical symbols — legal, math, punctuation, arrows, Greek letters, and fractions — with click-to-copy.",
    applicationCategory: "DeveloperApplication",
    currency: "INR",
    faqs: [{ question: "Does this include emoji?", answer: "No — this is the key difference from the Emoji Category Browser tool. The Symbol Picker deliberately excludes emoji entirely and focuses only on typographic and technical symbols like legal marks, math operators, punctuation, arrows, Greek letters, and fractions." }, { question: "How is this different from the Unicode Character Finder?", answer: "Unicode Character Finder is a broad keyword search across a mixed list of symbols and emoji. This Symbol Picker is narrower and purpose-built: a curated, category-organized set specifically for the typographic and technical symbols people commonly need while writing documents." }, { question: "Does clicking a symbol copy it automatically?", answer: "Yes — clicking any symbol copies it directly to your clipboard and shows a brief confirmation message." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
