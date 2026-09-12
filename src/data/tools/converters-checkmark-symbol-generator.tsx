import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/converters/checkmark-symbol-generator",
    navName: "Checkmark Symbol Generator",
    navDescription: "Browse and copy checkmark and cross symbols.",
    name: "Checkmark Symbol Generator - Copy Check & Cross Symbols",
    description: "Browse a curated set of checkmark, cross, and checkbox-related symbols — including ✓ ✔ ✗ ✘ ☒ ☐ ☑ ✅ ❌ and 🗹 — with click-to-copy.",
    navCategory: "Converters",
    shellCategory: "Converters",
    icon: <CheckCircleIcon fontSize="large" color="primary"/>,
    seoTitle: "Checkmark Symbol Generator - Copy Check & Cross Symbols",
    seoDescription: "Free online checkmark symbol generator. Browse and copy checkmark, cross, and checkbox symbols like ✓ ✔ ✗ ✘ ☒ ☐ ☑ ✅ and ❌.",
    keywords: ["checkmark symbol generator", "check mark symbol copy paste", "cross symbol generator", "checkbox symbol picker", "tick symbol copy"],
    ogTitle: "Checkmark Symbol Generator - Copy Check & Cross Symbols | ToolZoneX",
    ogDescription: "Browse and copy a curated set of checkmark, cross, and checkbox-related symbols.",
    schemaName: "Checkmark Symbol Generator",
    schemaDescription: "Browse a curated set of checkmark, cross, and checkbox-related symbols — including ✓ ✔ ✗ ✘ ☒ ☐ ☑ ✅ ❌ and 🗹 — with click-to-copy.",
    applicationCategory: "UtilityApplication",
    currency: undefined,
    faqs: [{ question: "How is this different from the Symbol Picker?", answer: "The Symbol Picker's categories cover Legal, Math, Punctuation, Arrows, Greek letters, and Fractions — none of which include checkmark or cross symbols. This tool fills that specific gap with a dedicated collection of check, X, and checkbox symbols." }, { question: "Why do some symbols look like emoji and others don't?", answer: "Symbols like ✓ and ✗ are plain typographic characters that render in a single color matching your text, while ones like ✅ and ❌ are emoji-style characters that most platforms render in full color." }, { question: "Does clicking a symbol copy it automatically?", answer: "Yes — clicking any symbol copies it directly to your clipboard and shows a brief confirmation message." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
