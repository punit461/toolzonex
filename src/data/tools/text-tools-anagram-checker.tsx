import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/text-tools/anagram-checker",
    navName: "Anagram Checker",
    navDescription: "Check if two words are anagrams.",
    name: "Anagram Checker",
    description: "Check whether two words or phrases are anagrams of each other by comparing their sorted letters, ignoring case, spaces, and punctuation.",
    navCategory: "Text Tools",
    shellCategory: "Text Tools",
    icon: <CompareArrowsIcon fontSize="large" color="primary"/>,
    seoTitle: "Anagram Checker - Check if Two Words Are Anagrams",
    seoDescription: "Check whether two words or phrases are anagrams of each other, ignoring case, spaces, and punctuation. Free and instant.",
    keywords: ["anagram checker", "anagram solver", "check anagram online", "are these words anagrams"],
    ogTitle: "Anagram Checker - Check if Two Words Are Anagrams | ToolZoneX",
    ogDescription: "Check whether two words or phrases are anagrams of each other.",
    schemaName: "Anagram Checker",
    schemaDescription: "Check whether two words or phrases are anagrams of each other by comparing their sorted letters, ignoring case, spaces, and punctuation.",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: [{ question: "Does it ignore spaces and punctuation?", answer: "Yes — spaces, punctuation, and capitalization are all ignored, so \"Dormitory\" and \"Dirty room\" are correctly identified as anagrams despite the different spacing." }, { question: "Do the two phrases need the same number of words?", answer: "No — only the letters matter. A single word can be an anagram of a multi-word phrase, as long as the combined letters match exactly." }, { question: "What if one box is empty?", answer: "The result only appears once both boxes contain at least one letter, since an anagram comparison needs two things to compare." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
