import NumbersIcon from '@mui/icons-material/Numbers';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/converters/binary-decoder",
    navName: "Binary Decoder",
    navDescription: "Decode binary strings to text.",
    name: "Binary Decoder",
    description: "Decode binary code to plain text instantly, supporting both space-separated and continuous binary strings.",
    navCategory: "Converters",
    shellCategory: "Converters",
    icon: <NumbersIcon fontSize="large" color="primary"/>,
    seoTitle: "Binary Decoder - Decode Binary Code to Text Online",
    seoDescription: "Free binary decoder that converts binary code to plain text instantly. Supports space-separated 8-bit groups and continuous binary strings with no spaces.",
    keywords: ["binary decoder", "decode binary", "binary to text decoder", "binary code decoder", "decode binary string", "binary string decoder", "binary decoder online"],
    ogTitle: "Binary Decoder - Decode Binary Code to Text Online | ToolZoneX",
    ogDescription: "Decode binary code to plain text instantly, supporting both spaced and continuous binary strings.",
    schemaName: "Binary Decoder",
    schemaDescription: "Decode binary code to plain text instantly, supporting both space-separated and continuous binary strings.",
    applicationCategory: "EducationalApplication",
    currency: "INR",
    faqs: [{ question: "Does the binary need spaces between bytes?", answer: "No — this decoder automatically detects whether your input has spaces. If it doesn't, it splits the string into 8-bit groups on its own, so both formats decode correctly." }, { question: "Why does it only decode, not encode?", answer: "Keeping this page decode-only makes it faster and simpler to use for the most common task — reading binary back into text. Use our separate Binary Encoder tool to go from text to binary instead." }, { question: "What happens if my input has an invalid character?", answer: "Binary can only contain 0s and 1s. If any other character appears (aside from spaces separating bytes), the tool shows an error instead of a partial or incorrect result." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
