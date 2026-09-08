import TagIcon from '@mui/icons-material/Tag';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/converters/unicode-character-lookup",
    navName: "Unicode Character Lookup",
    navDescription: "Full details for one character or code point.",
    name: "Unicode Character Lookup",
    description: "Look up a single character or Unicode code point to see its decimal and hex code point, UTF-8 bytes, HTML entity, and name.",
    navCategory: "Converters",
    shellCategory: "Converters",
    icon: <TagIcon fontSize="large" color="primary"/>,
    seoTitle: "Unicode Character Lookup - Inspect a Single Character",
    seoDescription: "Free Unicode character lookup. Enter a character or code point like U+2764 to see its decimal, hex, UTF-8 bytes, HTML entity, and name.",
    keywords: ["unicode character lookup", "unicode code point lookup", "character info lookup", "utf-8 byte lookup", "html entity lookup"],
    ogTitle: "Unicode Character Lookup - Inspect a Single Character | ToolZoneX",
    ogDescription: "Look up a single character or code point for full Unicode details.",
    schemaName: "Unicode Character Lookup",
    schemaDescription: "Look up a single character or Unicode code point to see its decimal and hex code point, UTF-8 bytes, HTML entity, and name.",
    applicationCategory: "DeveloperApplication",
    currency: "INR",
    faqs: [{ question: "How is this different from Text to Unicode / Unicode to Text?", answer: "Those tools convert whole strings of text between plain text and Unicode escape notation, one character after another. This tool is a detailed single-character inspector — enter one character or code point and see everything about it (decimal, hex, UTF-8 bytes, HTML entity, and name) at once." }, { question: "What if the character's name shows \"Unknown character name\"?", answer: "The name table covers Basic Latin, common punctuation and symbols, and roughly 100+ popular emoji, but isn't exhaustive. Every other field — decimal, hex, UTF-8 bytes, and HTML entity — is computed directly and always works regardless of whether the name is known." }, { question: "Can I enter more than one character?", answer: "Only the first character (or code point) you enter is inspected — this keeps the tool focused as a single-character detail view rather than a bulk converter." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
