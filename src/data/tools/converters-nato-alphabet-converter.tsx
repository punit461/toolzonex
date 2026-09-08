import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/converters/nato-alphabet-converter",
    navName: "NATO Alphabet Converter",
    navDescription: "Convert text to the NATO phonetic alphabet.",
    name: "NATO Alphabet Converter",
    description: "Convert any text to the NATO phonetic alphabet — letters become words like Alpha and Bravo, digits become spoken forms like Niner.",
    navCategory: "Converters",
    shellCategory: "Converters",
    icon: <RecordVoiceOverIcon fontSize="large" color="primary"/>,
    seoTitle: "NATO Alphabet Converter - Phonetic Alphabet Translator",
    seoDescription: "Convert any text to the NATO phonetic alphabet — letters become words like Alpha and Bravo, digits become spoken forms like Niner. Free online tool.",
    keywords: ["nato alphabet converter", "nato phonetic alphabet", "phonetic alphabet translator", "military alphabet converter", "spelling alphabet converter"],
    ogTitle: "NATO Alphabet Converter - Phonetic Alphabet Translator | ToolZoneX",
    ogDescription: "Convert any text to the NATO phonetic alphabet — letters become words like Alpha and Bravo.",
    schemaName: "NATO Alphabet Converter",
    schemaDescription: "Convert any text to the NATO phonetic alphabet — letters become words like Alpha and Bravo, digits become spoken forms like Niner.",
    applicationCategory: "EducationalApplication",
    currency: "INR",
    faqs: [{ question: "Why is 9 spelled \"Niner\" instead of \"Nine\"?", answer: "This is a real aviation and radio convention — \"Niner\" is used specifically because \"Nine\" can sound too similar to \"Five\" or get lost over noisy radio channels, so \"Niner\" was adopted as the standard, more distinct pronunciation." }, { question: "What happens to spaces and punctuation in my text?", answer: "They're skipped between the resulting phonetic words rather than being spelled out themselves, so the output is just a clean sequence of NATO words and number words for every letter and digit found." }, { question: "Does capitalization matter?", answer: "No — the conversion is case-insensitive, so uppercase and lowercase letters are converted to the same phonetic word." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
