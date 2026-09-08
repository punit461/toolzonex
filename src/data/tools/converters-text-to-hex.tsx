import DataObjectIcon from '@mui/icons-material/DataObject';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/converters/text-to-hex",
    navName: "Text to Hex",
    navDescription: "Encode text into a hex string.",
    name: "Text to Hex Converter",
    description: "Encode plain text into a hexadecimal string instantly.",
    navCategory: "Converters",
    shellCategory: "Converters",
    icon: <DataObjectIcon fontSize="large" color="primary"/>,
    seoTitle: "Text to Hex Converter - Encode Text to Hex Online",
    seoDescription: "Free text to hex converter. Type or paste plain text and encode it to a hexadecimal string instantly, with full UTF-8 support.",
    keywords: ["text to hex", "text to hex converter", "encode text to hex", "hex encoder", "convert text to hex", "string to hex", "ascii to hex"],
    ogTitle: "Text to Hex Converter - Encode Text to Hex Online | ToolZoneX",
    ogDescription: "Encode plain text into a hexadecimal string instantly.",
    schemaName: "Text to Hex Converter",
    schemaDescription: "Encode plain text into a hexadecimal string instantly.",
    applicationCategory: "DeveloperApplication",
    currency: "INR",
    faqs: [{ question: "Why is each character shown as two hex digits?", answer: "A single byte (8 bits) is always represented by exactly two hex digits, since each hex digit covers 4 bits — so two digits together cover a full byte's range of values." }, { question: "Does this support special characters and emoji?", answer: "Yes — the input is UTF-8 encoded before conversion, so accented letters, symbols, and emoji encode correctly, sometimes producing multiple hex byte pairs per character." }, { question: "Does this tool also decode hex back to text?", answer: "This page is encode-only, for a simpler, focused experience. Use our separate Hex to Text tool if you need to convert a hex string back into plain text." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
