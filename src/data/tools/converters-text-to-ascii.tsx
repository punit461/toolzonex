import TextFormatIcon from '@mui/icons-material/TextFormat';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/converters/text-to-ascii",
    navName: "Text to ASCII",
    navDescription: "Encode text into ASCII codes.",
    name: "Text to ASCII Converter",
    description: "Convert plain text into space-separated decimal ASCII code values instantly.",
    navCategory: "Converters",
    shellCategory: "Converters",
    icon: <TextFormatIcon fontSize="large" color="primary"/>,
    seoTitle: "Text to ASCII Converter - Get ASCII Codes Online",
    seoDescription: "Free text to ASCII converter. Type or paste plain text and convert each character to its decimal ASCII code instantly, space-separated.",
    keywords: ["text to ascii", "text to ascii converter", "get ascii code", "convert text to ascii", "ascii code generator", "text to ascii code"],
    ogTitle: "Text to ASCII Converter - Get ASCII Codes Online | ToolZoneX",
    ogDescription: "Convert plain text into decimal ASCII code values instantly.",
    schemaName: "Text to ASCII Converter",
    schemaDescription: "Convert plain text into space-separated decimal ASCII code values instantly.",
    applicationCategory: "EducationalApplication",
    currency: "INR",
    faqs: [{ question: "Does this support special characters and emoji?", answer: "Yes — characters beyond the standard ASCII range are converted using their full Unicode code point, so accented letters, symbols, and emoji all produce a valid numeric code." }, { question: "What's the difference between ASCII and Unicode code points?", answer: "ASCII covers only the first 128 code points (0-127), while Unicode extends far beyond that to cover virtually every character and symbol. This tool outputs the underlying code point for each character, which matches ASCII for standard English text." }, { question: "Does this tool also decode ASCII codes back to text?", answer: "This page is encode-only, for a simpler, focused experience. Use our separate ASCII to Text tool if you need to convert ASCII code values back into plain text." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
