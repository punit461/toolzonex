import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/text-tools/emoji-text-converter",
    navName: "Emoji Text Converter",
    navDescription: "Replace common words in text with matching emoji.",
    name: "Emoji Text Converter",
    description: "Replace whole-word matches of common words in text with a matching emoji, leaving unmatched words unchanged.",
    navCategory: "Text Tools",
    shellCategory: "Text Tools",
    icon: <EmojiEmotionsIcon fontSize="large" color="primary"/>,
    seoTitle: "Emoji Text Converter - Turn Words into Emoji Online",
    seoDescription: "Replace whole-word matches of common words in text with a matching emoji, leaving unmatched words unchanged. Free online emoji text converter.",
    keywords: ["emoji text converter", "convert words to emoji", "text to emoji tool", "emoji translator", "word to emoji converter"],
    ogTitle: "Emoji Text Converter - Turn Words into Emoji Online | ToolZoneX",
    ogDescription: "Replace whole-word matches of common words in text with a matching emoji.",
    schemaName: "Emoji Text Converter",
    schemaDescription: "Replace whole-word matches of common words in text with a matching emoji, leaving unmatched words unchanged.",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: [{ question: "How is this different from the Random Emoji Generator?", answer: "The Random Emoji Generator produces random emoji unrelated to any text you provide. This tool instead transforms EXISTING text by replacing recognized words with a matching emoji — it never picks anything at random." }, { question: "How is this different from the Emoji Counter?", answer: "The Emoji Counter analyzes emoji that are ALREADY present in text you paste in and counts them. This tool does the opposite — it adds new emoji into your text by replacing matching words, rather than counting anything that's already there." }, { question: "What happens to words not in the dictionary?", answer: "They're left exactly as typed — only whole words that exactly match one of the tool's built-in ~50 recognized words are ever replaced." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
