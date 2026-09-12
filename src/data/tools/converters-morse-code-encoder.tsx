import SendIcon from '@mui/icons-material/Send';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/converters/morse-code-encoder",
    navName: "Morse Code Encoder",
    navDescription: "Encode text into Morse code.",
    name: "Morse Code Encoder",
    description: "Encode plain text into Morse code instantly using standard International Morse Code.",
    navCategory: "Converters",
    shellCategory: "Converters",
    icon: <SendIcon fontSize="large" color="primary"/>,
    seoTitle: "Morse Code Encoder - Convert Text to Morse Code Online",
    seoDescription: "Free Morse code encoder. Type or paste plain text and convert it to Morse code instantly, with letters space-separated and words separated by a slash.",
    keywords: ["morse code encoder", "text to morse code", "encode morse code", "morse code generator", "convert text to morse", "morse encoder online"],
    ogTitle: "Morse Code Encoder - Convert Text to Morse Code Online | ToolZoneX",
    ogDescription: "Encode plain text into Morse code instantly.",
    schemaName: "Morse Code Encoder",
    schemaDescription: "Encode plain text into Morse code instantly using standard International Morse Code.",
    applicationCategory: "EducationalApplication",
    currency: "INR",
    faqs: [{ question: "How are words separated in the output?", answer: "Letters within a word are separated by a single space, and words are separated by a forward slash (/) with a space on each side." }, { question: "What characters can this encode?", answer: "Standard International Morse Code covers uppercase and lowercase letters (case-insensitive), digits 0-9, and common punctuation marks like periods, commas, question marks, and parentheses." }, { question: "Does this tool also decode Morse code back to text?", answer: "This page is encode-only, for a simpler, focused experience. Use our two-way Morse Code Translator if you need to decode Morse code back into plain text." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
