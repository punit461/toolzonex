import TagIcon from '@mui/icons-material/Tag';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/converters/unicode-to-text",
    navName: "Unicode to Text",
    navDescription: "Decode Unicode code points to text.",
    name: "Unicode to Text Converter",
    description: "Decode Unicode code points in U+XXXX or plain hex format into plain text instantly.",
    navCategory: "Converters",
    shellCategory: "Converters",
    icon: <TagIcon fontSize="large" color="primary"/>,
    seoTitle: "Unicode to Text Converter - Decode Code Points Online",
    seoDescription: "Free Unicode to text converter. Paste Unicode code points in U+XXXX or plain hex format and decode them to plain text instantly.",
    keywords: ["unicode to text", "unicode to text converter", "decode unicode", "unicode decoder", "code point to text", "convert unicode to text", "u+ to text"],
    ogTitle: "Unicode to Text Converter - Decode Code Points Online | ToolZoneX",
    ogDescription: "Decode Unicode code points into plain text instantly.",
    schemaName: "Unicode to Text Converter",
    schemaDescription: "Decode Unicode code points in U+XXXX or plain hex format into plain text instantly.",
    applicationCategory: "DeveloperApplication",
    currency: "INR",
    faqs: [{ question: "Do I need to include the U+ prefix?", answer: "No — the tool accepts code points with or without the U+ prefix, as long as the hex digits themselves are correct." }, { question: "Can this decode emoji and other complex characters?", answer: "Yes — any valid Unicode code point decodes correctly, including emoji, accented letters, and symbols outside the Basic Latin range." }, { question: "Does this tool also convert text into Unicode code points?", answer: "This page is decode-only, for a simpler, focused experience. Use our separate Text to Unicode tool if you need to convert plain text into Unicode code points instead." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
