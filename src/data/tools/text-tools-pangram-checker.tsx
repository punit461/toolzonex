import TextFieldsIcon from '@mui/icons-material/TextFields';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/text-tools/pangram-checker",
    navName: "Pangram Checker",
    navDescription: "Check if text contains every letter of the alphabet.",
    name: "Pangram Checker",
    description: "Check whether text contains all 26 letters of the English alphabet at least once, with a visual letter-coverage chart.",
    navCategory: "Text Tools",
    shellCategory: "Text Tools",
    icon: <TextFieldsIcon fontSize="large" color="primary"/>,
    seoTitle: "Pangram Checker - Check for a Full Alphabet Sentence",
    seoDescription: "Check whether text contains all 26 letters of the English alphabet at least once. Free online pangram checker with a visual letter chart.",
    keywords: ["pangram checker", "is this a pangram", "pangram tool", "check pangram online", "alphabet coverage checker"],
    ogTitle: "Pangram Checker - Check for a Full Alphabet Sentence | ToolZoneX",
    ogDescription: "Check whether text contains all 26 letters of the English alphabet at least once.",
    schemaName: "Pangram Checker",
    schemaDescription: "Check whether text contains all 26 letters of the English alphabet at least once, with a visual letter-coverage chart.",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: [{ question: "Does capitalization matter?", answer: "No — the check is entirely case-insensitive, so uppercase and lowercase versions of a letter both count as that letter being present." }, { question: "Do numbers and punctuation affect the result?", answer: "No — only the 26 letters A through Z are checked; digits, spaces, and punctuation marks are ignored completely." }, { question: "What is a pangram used for?", answer: "Pangrams are commonly used to preview fonts (since every letterform appears at least once), in typing practice, and as a classic word-puzzle challenge to write the shortest possible sentence containing every letter." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
