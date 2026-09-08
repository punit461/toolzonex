import MoodIcon from '@mui/icons-material/Mood';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/text-tools/remove-emojis",
    navName: "Remove Emojis",
    navDescription: "Strip or extract emojis from text.",
    name: "Remove Emojis - Strip Emojis from Text Online",
    description: "Remove all emoji characters from text or extract only emojis. Uses Unicode regex to match full emoji ranges with a count of emojis found.",
    navCategory: "Text Tools",
    shellCategory: "Text Tools",
    icon: <MoodIcon fontSize="large" color="primary"/>,
    seoTitle: "Remove Emojis - Strip Emojis from Text Online",
    seoDescription: "Free online tool to remove emojis from text or extract emojis only. Strips all Unicode emoji characters with an emoji count. Works entirely in your browser.",
    keywords: ["remove emojis", "strip emojis", "delete emojis from text", "extract emojis", "emoji remover", "clean text emojis", "remove emoji characters"],
    ogTitle: "Remove Emojis - Strip Emojis from Text Online | ToolZoneX",
    ogDescription: "Remove all emoji characters from text or extract only emojis. Free online emoji remover tool.",
    schemaName: "Remove Emojis",
    schemaDescription: "Remove or extract emoji characters from any text using Unicode regex.",
    applicationCategory: "UtilitiesApplication",
    currency: undefined,
    faqs: undefined,
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
