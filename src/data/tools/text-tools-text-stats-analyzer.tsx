import TextFieldsIcon from '@mui/icons-material/TextFields';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/text-tools/text-stats-analyzer",
    navName: "Text Stats Analyzer",
    navDescription: "Detailed text statistics and readability.",
    name: "Text Stats Analyzer",
    description: "Analyze characters, words, syllables, vowels, consonants, and sentence length instantly.",
    navCategory: "Text Tools",
    shellCategory: "Text Tools",
    icon: <TextFieldsIcon fontSize="large" color="primary"/>,
    seoTitle: "Text Stats Analyzer - Character, Word & Syllable Counts",
    seoDescription: "Analyze text statistics including characters, words, syllables, vowels, consonants, and average word length instantly online.",
    keywords: ["text stats analyzer", "text metrics", "syllable counter", "vowel counter", "consonant counter", "average word length"],
    ogTitle: "Text Stats Analyzer - Character, Word & Syllable Counts | ToolZoneX",
    ogDescription: "Analyze text statistics including characters, words, syllables, vowels, consonants, and average word length.",
    schemaName: "Text Stats Analyzer",
    schemaDescription: "Advanced text analysis tool for characters, words, syllables, vowels, consonants, and other metrics.",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: undefined,
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
