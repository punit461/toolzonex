import TextFieldsIcon from '@mui/icons-material/TextFields';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/text-tools/leetspeak-converter",
    navName: "Leetspeak Converter",
    navDescription: "Convert text to 1337 speak.",
    name: "Leetspeak Converter",
    description: "Convert text to leetspeak (1337 speak) with number substitutions and random casing. Free online text encoder.",
    navCategory: "Text Tools",
    shellCategory: "Text Tools",
    icon: <TextFieldsIcon fontSize="large" color="primary"/>,
    seoTitle: "Leetspeak Converter - Convert Text to 1337 Speak",
    seoDescription: "Convert text to leetspeak (1337 speak) with number substitutions and random casing. Free online text encoder.",
    keywords: ["leetspeak converter", "1337 speak", "leet translator", "text to leetspeak", "leet generator", "l33t translator", "leet name generator", "leet username generator", "1337 translator", "leetspeak name generator", "convert text to leet"],
    ogTitle: "Leetspeak Converter - Convert Text to 1337 Speak | ToolZoneX",
    ogDescription: "Convert text to leetspeak (1337 speak) with number substitutions and random casing. Free online text encoder.",
    schemaName: "LeetspeakConverter",
    schemaDescription: "Convert text to leetspeak (1337 speak) with number substitutions and random casing. Free online text encoder.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "Can I convert leetspeak back to normal text?", answer: "Not with this tool — it's one-way, since number substitutions aren't always reversible unambiguously." }, { question: "Can I use this as a leet name generator for my username?", answer: "Yes — type your name (or any word) into the input box and convert it; the result is a ready-to-use 1337-style name or gamertag." }, { question: "Why does the same input give different output each time?", answer: "The random-case option randomizes on every conversion — turn it off for consistent, repeatable output." }, { question: "Is my text uploaded anywhere?", answer: "No — conversion happens entirely in your browser." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
