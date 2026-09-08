import TextFormatIcon from '@mui/icons-material/TextFormat';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/converters/ascii-to-text",
    navName: "ASCII to Text",
    navDescription: "Decode ASCII codes to text.",
    name: "ASCII to Text Converter",
    description: "Decode space or comma-separated decimal ASCII code values into plain text instantly.",
    navCategory: "Converters",
    shellCategory: "Converters",
    icon: <TextFormatIcon fontSize="large" color="primary"/>,
    seoTitle: "ASCII to Text Converter - Decode ASCII Codes Online",
    seoDescription: "Free ASCII to text converter. Paste space or comma-separated decimal ASCII code values and decode them to plain text instantly.",
    keywords: ["ascii to text", "ascii to text converter", "decode ascii", "ascii decoder", "ascii code to text", "convert ascii to text", "ascii code converter"],
    ogTitle: "ASCII to Text Converter - Decode ASCII Codes Online | ToolZoneX",
    ogDescription: "Decode ASCII code values into plain text instantly.",
    schemaName: "ASCII to Text Converter",
    schemaDescription: "Decode space or comma-separated decimal ASCII code values into plain text instantly.",
    applicationCategory: "EducationalApplication",
    currency: "INR",
    faqs: [{ question: "What format should the ASCII codes be in?", answer: "Enter decimal (base-10) numbers separated by spaces or commas, for example 72 101 108. Codes outside the standard ASCII/Unicode range will show an error." }, { question: "Does this only work with standard ASCII (0-127)?", answer: "No — it also accepts extended Unicode code points beyond 127, so codes for accented letters, symbols, and other characters decode correctly too." }, { question: "Does this tool also convert text to ASCII codes?", answer: "This page is decode-only, for a simpler, focused experience. Use our separate Text to ASCII tool if you need to convert plain text into ASCII code values instead." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
