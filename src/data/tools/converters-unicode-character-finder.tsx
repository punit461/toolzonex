import FindReplaceIcon from '@mui/icons-material/FindReplace';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/converters/unicode-character-finder",
    navName: "Unicode Character Finder",
    navDescription: "Find a character by name or keyword.",
    name: "Unicode Character Finder",
    description: "Search a curated list of common named symbols and emoji by keyword to find the character you're looking for, with name and code point shown.",
    navCategory: "Converters",
    shellCategory: "Converters",
    icon: <FindReplaceIcon fontSize="large" color="primary"/>,
    seoTitle: "Unicode Character Finder - Search Symbols & Emoji by Keyword",
    seoDescription: "Free Unicode character finder. Search by keyword like heart, arrow, or star to find matching symbols and emoji with their name and code point.",
    keywords: ["unicode character finder", "find emoji by name", "symbol finder by keyword", "search unicode symbols", "emoji search tool"],
    ogTitle: "Unicode Character Finder - Search Symbols & Emoji | ToolZoneX",
    ogDescription: "Search common symbols and emoji by keyword to find the character you need.",
    schemaName: "Unicode Character Finder",
    schemaDescription: "Search a curated list of common named symbols and emoji by keyword to find the character you're looking for, with name and code point shown.",
    applicationCategory: "DeveloperApplication",
    currency: "INR",
    faqs: [{ question: "How is this different from the Unicode Character Lookup?", answer: "Unicode Character Lookup is for when you already have one specific character or code point in hand and want its full details. This Unicode Character Finder is the opposite direction — you only know roughly what the character should be called or represent, and the tool helps you find it by keyword search." }, { question: "Does this cover every emoji?", answer: "No — it's a curated list of roughly 130 of the most commonly searched symbols and emoji, not the full Unicode emoji set. It's designed to quickly surface popular, everyday characters rather than being an exhaustive reference." }, { question: "Can I search using a synonym instead of the exact name?", answer: "Yes — each character has several associated keywords beyond its formal name, so searching \"like\" for 👍 or \"money\" for 💰 and 💵 will still find relevant matches." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
