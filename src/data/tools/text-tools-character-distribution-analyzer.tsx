import TextFieldsIcon from '@mui/icons-material/TextFields';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/text-tools/character-distribution-analyzer",
    navName: "Character Distribution",
    navDescription: "Analyze character frequencies.",
    name: "Character Distribution Analyzer",
    description: "Analyze the exact frequency and distribution of every character in your text. Free online character counting tool.",
    navCategory: "Text Tools",
    shellCategory: "Text Tools",
    icon: <TextFieldsIcon fontSize="large" color="primary"/>,
    seoTitle: "Character Distribution Analyzer - Letter Frequency Counter",
    seoDescription: "Analyze the exact frequency and distribution of every character in your text. Free online character counting and letter frequency tool.",
    keywords: ["character distribution analyzer", "letter frequency counter", "character count tool", "text frequency analysis", "letter statistics", "letter frequency online"],
    ogTitle: "Character Distribution Analyzer - Letter Frequency Counter | ToolZoneX",
    ogDescription: "Analyze the exact frequency and distribution of every character in your text.",
    schemaName: "Character Distribution Analyzer",
    schemaDescription: "Analyze the exact frequency and distribution of every character in your text.",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: [{ question: "Can I check letter frequency online with this tool?", answer: "Yes — paste your text and every letter, digit, space, and punctuation mark is broken out in the results table with its count and percentage, so you can check letter frequency online without downloading any software." }, { question: "Is the analysis case-sensitive?", answer: "Uppercase and lowercase versions of the same letter are typically counted separately, reflecting the exact characters as typed." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
