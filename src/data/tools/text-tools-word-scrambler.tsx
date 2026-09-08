import ShuffleIcon from '@mui/icons-material/Shuffle';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/text-tools/word-scrambler",
    navName: "Word Scrambler",
    navDescription: "Scramble letters in words or text.",
    name: "Word Scrambler",
    description: "Scramble the letters in words or text while keeping first and last letters intact. Free online word scrambler.",
    navCategory: "Text Tools",
    shellCategory: "Text Tools",
    icon: <ShuffleIcon fontSize="large" color="primary"/>,
    seoTitle: "Word Scrambler - Scramble Letters in Text Online",
    seoDescription: "Scramble the letters in words or text while keeping first and last letters intact. Free online word scrambler tool.",
    keywords: ["word scrambler", "letter scrambler", "scramble text", "jumble words", "text scrambler online", "text scrambler", "scramblinator"],
    ogTitle: "Word Scrambler - Scramble Letters in Text Online | ToolZoneX",
    ogDescription: "Scramble the letters in words or text while keeping first and last letters intact. Free online word scrambler tool.",
    schemaName: "WordScrambler",
    schemaDescription: "Scramble the letters in words or text while keeping first and last letters intact. Free online word scrambler tool.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "Is this the same as a text scrambler or \"scramblinator\"?", answer: "Yes — this tool is a text scrambler (sometimes searched as a \"scramblinator\") that jumbles the letters in each word while leaving spacing and word order untouched." }, { question: "Why are short words left unchanged?", answer: "Words under 4 letters don't have enough middle letters to scramble meaningfully." }, { question: "Is the scramble the same every time?", answer: "No, each click produces a new random shuffle." }, { question: "Is my text uploaded anywhere?", answer: "No — scrambling happens entirely in your browser." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
