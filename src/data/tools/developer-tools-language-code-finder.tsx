import LanguageIcon from '@mui/icons-material/Language';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/developer-tools/language-code-finder",
    navName: "Language Code Finder",
    navDescription: "Find ISO 639-1 language codes by name.",
    name: "Language Code Finder",
    description: "Look up a language's ISO 639-1 two-letter code and native name by searching its English name, native name, or code.",
    navCategory: "Developer Tools",
    shellCategory: "Developer Tools",
    icon: <LanguageIcon fontSize="large" color="primary"/>,
    seoTitle: "Language Code Finder - ISO 639-1 Language Codes Lookup",
    seoDescription: "Free language code finder. Search any language name to find its ISO 639-1 two-letter code and native name instantly.",
    keywords: ["language code finder", "iso 639-1 lookup", "language code lookup", "html lang attribute codes", "i18n language codes"],
    ogTitle: "Language Code Finder - ISO 639-1 Language Codes Lookup | ToolZoneX",
    ogDescription: "Search a language name to find its ISO 639-1 code and native name.",
    schemaName: "Language Code Finder",
    schemaDescription: "Look up a language's ISO 639-1 two-letter code and native name by searching its English name, native name, or code.",
    applicationCategory: "DeveloperApplication",
    currency: "INR",
    faqs: [{ question: "How is this different from the Country Code Finder?", answer: "The Country Code Finder looks up ISO 3166 country codes and international calling codes. This tool looks up a completely different standard — ISO 639-1 language codes — which identify languages rather than countries, and are related but distinct standards commonly confused with each other." }, { question: "Why is a language's code sometimes not two letters?", answer: "Every code shown here is a standard two-letter ISO 639-1 code; a small number of widely-used languages (like Filipino) that lack a dedicated ISO 639-1 code use their commonly accepted alternate code instead." }, { question: "Does this include every language in the world?", answer: "This covers over 150 of the most commonly used ISO 639-1 codes, but ISO 639 as a whole (including its later parts, like 639-2 and 639-3) covers thousands of languages beyond this list." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
