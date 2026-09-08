import TranslateIcon from '@mui/icons-material/Translate';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/converters/pig-latin-translator",
    navName: "Pig Latin Translator",
    navDescription: "Translate English text into Pig Latin.",
    name: "Pig Latin Translator - English to Pig Latin",
    description: "Translate any English sentence into Pig Latin, moving each word's leading consonant cluster to the end and appending \"ay\", or appending \"way\" for vowel-leading words.",
    navCategory: "Converters",
    shellCategory: "Converters",
    icon: <TranslateIcon fontSize="large" color="primary"/>,
    seoTitle: "Pig Latin Translator - Free English to Pig Latin Converter",
    seoDescription: "Free Pig Latin translator. Convert any English sentence into Pig Latin instantly, preserving spacing, punctuation, and capitalization.",
    keywords: ["pig latin translator", "pig latin converter", "english to pig latin", "pig latin generator", "pig latin online tool"],
    ogTitle: "Pig Latin Translator - Free English to Pig Latin Converter | ToolZoneX",
    ogDescription: "Convert any English sentence into Pig Latin instantly.",
    schemaName: "Pig Latin Translator",
    schemaDescription: "Translate any English sentence into Pig Latin, moving each word's leading consonant cluster to the end and appending \"ay\".",
    applicationCategory: "EducationalApplication",
    currency: "INR",
    faqs: [{ question: "Can this tool translate Pig Latin back to English?", answer: "No — this tool is one-directional (English to Pig Latin) by design. Reversing Pig Latin back to standard English is fundamentally ambiguous: many different English words can produce very similar or identical Pig Latin forms, so there's no reliable general rule for automatically undoing the transformation." }, { question: "What happens to punctuation and capitalization?", answer: "Punctuation stays exactly where it was relative to each word, and capitalization is preserved — if a word started with a capital letter, the translated version starts with a capital letter too." }, { question: "What happens with a word that has no vowels, like \"my\" or \"gym\"?", answer: "If no vowel is found in the word at all, the entire word is treated as the leading consonant cluster and moved to the front with \"ay\" appended — for example, \"my\" becomes \"myay\"." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
