import TextFieldsIcon from '@mui/icons-material/TextFields';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/converters/base64-encoder",
    navName: "Base64 Encoder",
    navDescription: "Encode plain text to Base64.",
    name: "Base64 Encoder",
    description: "Encode plain text to a Base64 string instantly. Free, single-purpose online Base64 encoder.",
    navCategory: "Converters",
    shellCategory: "Converters",
    icon: <TextFieldsIcon fontSize="large" color="primary"/>,
    seoTitle: "Base64 Encoder - Encode Text to Base64 Online",
    seoDescription: "Free online Base64 encoder. Type or paste plain text and instantly get the Base64-encoded output — no decode mode, no sign-up, no upload.",
    keywords: ["base64 encoder", "encode base64", "text to base64", "base64 encode online", "encode string to base64"],
    ogTitle: "Base64 Encoder - Encode Text to Base64 Online | ToolZoneX",
    ogDescription: "Type or paste plain text and instantly get the Base64-encoded output.",
    schemaName: "Base64 Encoder",
    schemaDescription: "Encode plain text to a Base64 string instantly.",
    applicationCategory: "DeveloperApplication",
    currency: "INR",
    faqs: [{ question: "Is Base64 encoding secure?", answer: "No — Base64 is an encoding, not encryption. It's trivially reversible by anyone, so it should never be used to protect sensitive data; it's meant only for representing binary or text data safely as plain text." }, { question: "Does this support special characters and emoji?", answer: "Yes — the input is UTF-8 encoded before conversion, so accented letters, symbols, and emoji encode and decode correctly." }, { question: "Does this tool also decode Base64?", answer: "This page is encode-only, for a simpler, focused experience. Use our separate Base64 Decoder tool if you need to convert a Base64 string back into plain text." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
