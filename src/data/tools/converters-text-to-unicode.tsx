import TagIcon from '@mui/icons-material/Tag';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/converters/text-to-unicode",
    navName: "Text to Unicode",
    navDescription: "Encode text into Unicode code points.",
    name: "Text to Unicode Converter",
    description: "Convert plain text into Unicode code points in standard U+XXXX format instantly.",
    navCategory: "Converters",
    shellCategory: "Converters",
    icon: <TagIcon fontSize="large" color="primary"/>,
    seoTitle: "Text to Unicode Converter - Get Unicode Code Points Online",
    seoDescription: "Free text to Unicode converter. Type or paste plain text and convert each character to its Unicode code point in standard U+XXXX format instantly.",
    keywords: ["text to unicode", "text to unicode converter", "unicode code point converter", "convert text to unicode", "get unicode code point", "text to code point"],
    ogTitle: "Text to Unicode Converter - Get Unicode Code Points Online | ToolZoneX",
    ogDescription: "Convert plain text into Unicode code points instantly.",
    schemaName: "Text to Unicode Converter",
    schemaDescription: "Convert plain text into Unicode code points in standard U+XXXX format instantly.",
    applicationCategory: "DeveloperApplication",
    currency: "INR",
    faqs: [{ question: "What does the U+ prefix mean?", answer: "U+ is the standard notation for a Unicode code point, followed by its hexadecimal value — for example U+0041 is the code point for the letter \"A\"." }, { question: "Does this support emoji and characters outside the Basic Latin range?", answer: "Yes — every character, including accented letters, symbols, and emoji, is converted using its full Unicode code point, not just the standard ASCII range." }, { question: "Does this tool also decode Unicode code points back to text?", answer: "This page is encode-only, for a simpler, focused experience. Use our separate Unicode to Text tool if you need to convert Unicode code points back into plain text." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
