import TextFieldsIcon from '@mui/icons-material/TextFields';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/converters/base64-decoder",
    navName: "Base64 Decoder",
    navDescription: "Decode Base64 to plain text.",
    name: "Base64 Decoder",
    description: "Decode a Base64 string back to plain text instantly. Free, single-purpose online Base64 decoder.",
    navCategory: "Converters",
    shellCategory: "Converters",
    icon: <TextFieldsIcon fontSize="large" color="primary"/>,
    seoTitle: "Base64 Decoder - Decode Base64 to Text Online",
    seoDescription: "Free online Base64 decoder. Paste a Base64 string and instantly get the decoded plain text — no encode mode, no sign-up, no upload.",
    keywords: ["base64 decoder", "decode base64", "base64 to text", "base64 decode online", "decode base64 string"],
    ogTitle: "Base64 Decoder - Decode Base64 to Text Online | ToolZoneX",
    ogDescription: "Paste a Base64 string and instantly get the decoded plain text.",
    schemaName: "Base64 Decoder",
    schemaDescription: "Decode a Base64 string back to plain text instantly.",
    applicationCategory: "DeveloperApplication",
    currency: "INR",
    faqs: [{ question: "Why does decoding fail with an error?", answer: "Base64 strings use a strict character set and are usually padded with = to a multiple of 4 characters. If the pasted text contains line breaks, extra whitespace, or isn't valid Base64 at all, decoding will fail — double-check you copied the full string." }, { question: "Is this the same as decryption?", answer: "No — Base64 is an encoding, not encryption. Anyone can decode it; it provides no security or confidentiality, it's simply a way to represent binary data as plain text." }, { question: "Does this tool also encode text to Base64?", answer: "This page is decode-only, for a simpler, focused experience. Use our separate Base64 Encoder tool if you need to convert plain text into Base64." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
