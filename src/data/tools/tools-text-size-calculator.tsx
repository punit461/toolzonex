import TextFieldsIcon from '@mui/icons-material/TextFields';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/tools/text-size-calculator",
    navName: "Text Size Calculator",
    navDescription: "Character count, word count & reading time.",
    name: "Text Size Calculator - Check Text Size Online",
    description: "Check text size online: character count, word count, byte size, and reading time. Free online text analyzer tool.",
    navCategory: "Tools",
    shellCategory: "Tools",
    icon: <TextFieldsIcon fontSize="large" color="primary"/>,
    seoTitle: "Text Size Calculator - Check Text Size Online",
    seoDescription: "Check text size online: character count, word count, byte size, and reading time. Free online text size calculator for any text.",
    keywords: ["text size calculator", "check text size online", "find text size", "text size checker", "online text size tool", "text analyzer", "character count", "word count", "reading time calculator", "text statistics", "content analysis", "text metrics", "text length calculator"],
    ogTitle: "Text Size Calculator - Check Text Size Online | ToolZoneX",
    ogDescription: "Analyze text with character count, word count, reading time, and more. Free online text size calculator for content analysis.",
    schemaName: "Text Size Calculator",
    schemaDescription: "Analyze text with character count, word count, reading time, and more. Free online text size calculator for content analysis.",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: [{ question: "How do I check text size online?", answer: "Paste or type your text into the box above — character count (with and without spaces), word count, sentence count, paragraphs, lines, byte size, and estimated reading/speaking time all calculate instantly, with nothing uploaded to a server." }, { question: "What counts as \"text size\" — words, characters, or bytes?", answer: "This tool measures all three: character count (with and without spaces), word count, and the actual byte size of the text (useful for checking limits in databases, APIs, or file uploads), alongside sentence, paragraph, and line counts." }, { question: "Does the reading time estimate account for different reading speeds?", answer: "It uses an average adult reading speed (roughly 200-250 words per minute); actual reading time will vary by individual and text complexity." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
