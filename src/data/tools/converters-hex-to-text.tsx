import DataObjectIcon from '@mui/icons-material/DataObject';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/converters/hex-to-text",
    navName: "Hex to Text",
    navDescription: "Decode hex strings to text.",
    name: "Hex to Text Converter",
    description: "Decode a hexadecimal string into plain UTF-8 text instantly.",
    navCategory: "Converters",
    shellCategory: "Converters",
    icon: <DataObjectIcon fontSize="large" color="primary"/>,
    seoTitle: "Hex to Text Converter - Decode Hex Strings Online",
    seoDescription: "Free hex to text converter. Paste a hexadecimal string and decode it to plain UTF-8 text instantly, with or without spaces between byte pairs.",
    keywords: ["hex to text", "hex to text converter", "decode hex", "hex decoder", "hex string to text", "convert hex to text", "hexadecimal to text"],
    ogTitle: "Hex to Text Converter - Decode Hex Strings Online | ToolZoneX",
    ogDescription: "Decode a hexadecimal string into plain text instantly.",
    schemaName: "Hex to Text Converter",
    schemaDescription: "Decode a hexadecimal string into plain UTF-8 text instantly.",
    applicationCategory: "DeveloperApplication",
    currency: "INR",
    faqs: [{ question: "Does the hex string need spaces between bytes?", answer: "No — you can paste hex with spaces, commas, or 0x prefixes between byte pairs, or one continuous string with no separators at all. All of these formats decode correctly." }, { question: "What if my hex string has an odd number of digits?", answer: "Hex bytes are always represented by two digits, so a string with an odd digit count is invalid and the tool shows an error instead of guessing at a partial byte." }, { question: "Does this tool also encode text to hex?", answer: "This page is decode-only, for a simpler, focused experience. Use our separate Text to Hex tool if you need to convert plain text into a hex string instead." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
