import TextFieldsIcon from '@mui/icons-material/TextFields';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/text-tools/soundex-calculator",
    navName: "Soundex Calculator",
    navDescription: "Generate phonetic codes for names & words.",
    name: "Soundex Calculator",
    description: "Generate the Soundex phonetic code for any word or name — free online Soundex algorithm calculator.",
    navCategory: "Text Tools",
    shellCategory: "Text Tools",
    icon: <TextFieldsIcon fontSize="large" color="primary"/>,
    seoTitle: "Soundex Calculator - Free Phonetic Code Generator",
    seoDescription: "Free online Soundex calculator. Generate the Soundex phonetic code for any word or name and instantly compare codes for similar-sounding names.",
    keywords: ["soundex calculator", "soundex algorithm", "phonetic code generator", "name matching algorithm", "soundex code", "phonetic algorithm", "soundex generator", "name soundex lookup", "genealogy name search"],
    ogTitle: "Soundex Calculator - Free Phonetic Code Generator | ToolZoneX",
    ogDescription: "Generate the Soundex phonetic code for any word or name — free online Soundex algorithm calculator.",
    schemaName: "Soundex Calculator",
    schemaDescription: "Generate the Soundex phonetic code for any word or name using the standard American Soundex algorithm.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "What is Soundex?", answer: "Soundex is a phonetic algorithm that converts a word — typically a name — into a 4-character code (one letter plus three digits) representing how it sounds, so that similar-sounding words share the same code regardless of small spelling differences." }, { question: "Why do two different spellings get the same code?", answer: "Soundex groups consonants that sound alike (like B, F, P, V) into the same digit and ignores vowels entirely, since vowels vary the most between alternate spellings of the same name. Two names that sound similar, such as \"Smith\" and \"Smyth\" or \"Robert\" and \"Rupert\", follow the same consonant pattern and so end up with the same code even though they're spelled differently." }, { question: "Is Soundex case-sensitive?", answer: "No. Soundex first converts the input to uppercase, so \"robert\", \"Robert\", and \"ROBERT\" all produce the identical code, R163." }, { question: "Does Soundex work for non-English names?", answer: "Soundex was designed around English-language pronunciation and spelling patterns, so it works best on names common in English-speaking records. It can still be applied to non-English names since it only looks at Latin letters, but the codes it produces may not reflect how those names actually sound in their original language." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
