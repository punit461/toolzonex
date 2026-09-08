import TextFieldsIcon from '@mui/icons-material/TextFields';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/converters/morse-code-translator",
    navName: "Morse Code Translator",
    navDescription: "Translate morse code text.",
    name: "Morse Code Translator",
    description: "Translate plain text to Morse code or decode Morse code back to text instantly. Free online translator.",
    navCategory: "Converters",
    shellCategory: "Converters",
    icon: <TextFieldsIcon fontSize="large" color="primary"/>,
    seoTitle: "Morse Code Translator - Encode & Decode Online",
    seoDescription: "Translate plain text to Morse code or decode Morse code back to text instantly. Free online translator for International Morse Code.",
    keywords: ["morse code translator", "morse code decoder", "text to morse code", "morse code converter", "learn morse code", "mos code translator", "translate morse code", "morse code to text", "morse to text translator", "morse code translator online", "morse code text translator", "how to translate morse code"],
    ogTitle: "Morse Code Translator - Encode & Decode Online | ToolZoneX",
    ogDescription: "Translate plain text to Morse code or decode Morse code back to text instantly.",
    schemaName: "Morse Code Translator",
    schemaDescription: "Translate plain text to Morse code or decode Morse code back to text instantly.",
    applicationCategory: "EducationalApplication",
    currency: "INR",
    faqs: [{ question: "How are words separated in Morse code?", answer: "Letters within a word are separated by a single space, and words are separated by a forward slash (/)." }, { question: "How do I translate Morse code back into text?", answer: "Switch to \"decode\" mode, paste the Morse code (dots and dashes, with letters separated by spaces and words separated by a slash) into the input box, and click \"Translate to Text\" — the plain-text result appears on the right, ready to copy." }, { question: "How do I translate text into Morse code?", answer: "Switch to \"encode\" mode, type or paste your message, and click \"Translate to Morse\" — each letter, number, and common punctuation mark is converted to its dot-dash equivalent." }, { question: "Is this the same as a \"mos code\" translator?", answer: "Yes — \"mos code\" is a common misspelling of \"Morse code.\" This translator works the same way no matter how you search for it: paste your text or code and hit translate." }, { question: "Is this Morse code translator free to use?", answer: "Yes — translation happens instantly in your browser, it's completely free to use, and no signup or installation is required." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
