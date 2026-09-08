import NumbersIcon from '@mui/icons-material/Numbers';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/converters/binary-to-text",
    navName: "Binary to Text",
    navDescription: "Decode binary code to text.",
    name: "Binary to Text Converter",
    description: "Easily convert binary code to plain text or encode text into binary. Free online binary translation tool.",
    navCategory: "Converters",
    shellCategory: "Converters",
    icon: <NumbersIcon fontSize="large" color="primary"/>,
    seoTitle: "Binary to Text Converter - Translate Binary Code Online",
    seoDescription: "Easily convert binary code to plain text or encode text into binary. Free online binary translation tool.",
    keywords: ["binary to text", "text to binary", "binary translator", "binary decoder", "binary code converter", "binary code to text", "translator for binary", "bimary translator", "convert binary to text", "binary text converter", "binary to text converter online"],
    ogTitle: "Binary to Text Converter - Translate Binary Code Online | ToolZoneX",
    ogDescription: "Easily convert binary code to plain text or encode text into binary.",
    schemaName: "Binary to Text Converter",
    schemaDescription: "Easily convert binary code to plain text or encode text into binary.",
    applicationCategory: "EducationalApplication",
    currency: "INR",
    faqs: [{ question: "Why 8 bits per character?", answer: "8 bits (1 byte) can represent 256 values, enough to cover the standard ASCII character set used for basic English text and symbols." }, { question: "How do I convert binary code to text?", answer: "Make sure the tool is in \"Binary to Text\" (decode) mode, paste your space-separated binary (e.g. 01001000 01100101) into the input box, and click \"Convert to Text\" — this acts as the translator for binary, turning each 8-bit group back into its matching character." }, { question: "What format does the binary input need to be in?", answer: "Each character should be represented as an 8-bit binary group (only 0s and 1s), with a single space between groups — for example 01001000 01101001 decodes to \"Hi\". Binary that isn't space-separated or contains characters other than 0 and 1 will show an error." }, { question: "Is \"bimary translator\" the same tool?", answer: "Yes — \"bimary\" is a common typo for \"binary.\" This binary-to-text translator works the same either way: paste your binary or text and convert." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
