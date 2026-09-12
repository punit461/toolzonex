import TextFieldsIcon from '@mui/icons-material/TextFields';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/braille-translator",
    navName: "Braille Translator",
    navDescription: "Translate English to Braille and back.",
    name: "Braille Translator",
    description: "Translate English text to Braille Unicode characters and back, with a per-character breakdown table.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <TextFieldsIcon fontSize="large" color="primary"/>,
    seoTitle: "Braille Translator - English to Braille & Back",
    seoDescription: "Free Braille translator. Convert English text to Braille Unicode characters and decode Braille back to English, with a per-character breakdown.",
    keywords: ["braille translator", "english to braille", "braille to english", "braille converter", "braille generator", "translate to braille", "braille alphabet translator", "braille unicode converter"],
    ogTitle: "Braille Translator - English to Braille & Back | ToolZoneX",
    ogDescription: "Translate English text to Braille Unicode characters and back, with a per-character breakdown table.",
    schemaName: "Braille Translator",
    schemaDescription: "Translate English text to Braille Unicode characters and back, with a per-character breakdown.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "Is this Grade 1 or Grade 2 Braille?", answer: "This is Grade 1 (uncontracted) Braille, where each letter maps to a single Braille cell. Grade 2 Braille uses contractions and shorthand for common words, which this tool does not implement." }, { question: "Why do some characters not translate?", answer: "Only standard English letters, digits, and basic punctuation have direct Braille equivalents in this mapping. Special characters outside this set are passed through unchanged." }, { question: "Can I paste Braille text to translate back?", answer: "Yes — switch the direction toggle to 'Braille → English' and paste or type Braille Unicode characters to decode them." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
