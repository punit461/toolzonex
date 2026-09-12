import NumbersIcon from '@mui/icons-material/Numbers';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/converters/binary-encoder",
    navName: "Binary Encoder",
    navDescription: "Encode text into binary.",
    name: "Binary Encoder",
    description: "Encode plain text into 8-bit binary code instantly.",
    navCategory: "Converters",
    shellCategory: "Converters",
    icon: <NumbersIcon fontSize="large" color="primary"/>,
    seoTitle: "Binary Encoder - Encode Text to Binary Code Online",
    seoDescription: "Free binary encoder that converts plain text into 8-bit binary code instantly. Type or paste text to get space-separated binary bytes.",
    keywords: ["binary encoder", "encode binary", "text to binary encoder", "binary code encoder", "encode text to binary", "binary encoder online"],
    ogTitle: "Binary Encoder - Encode Text to Binary Code Online | ToolZoneX",
    ogDescription: "Encode plain text into 8-bit binary code instantly.",
    schemaName: "Binary Encoder",
    schemaDescription: "Encode plain text into 8-bit binary code instantly.",
    applicationCategory: "EducationalApplication",
    currency: "INR",
    faqs: [{ question: "Why 8 bits per character?", answer: "8 bits (1 byte) can represent 256 values, enough to cover the standard ASCII character set used for basic English text and symbols." }, { question: "Does this support special characters and emoji?", answer: "Each character is encoded using its underlying character code, so standard letters, numbers, and punctuation all encode correctly. Multi-byte characters like emoji may produce multiple binary bytes." }, { question: "Does this tool also decode binary back to text?", answer: "This page is encode-only, for a simpler, focused experience. Use our separate Binary Decoder tool if you need to convert a binary string back into plain text." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
