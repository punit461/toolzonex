import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/converters/rot13-decoder",
    navName: "ROT13 Encoder/Decoder",
    navDescription: "Encode or decode ROT13 text.",
    name: "ROT13 Encoder / Decoder",
    description: "Encode or decode ROT13 text instantly — since ROT13 is self-inverse, one box handles both directions.",
    navCategory: "Converters",
    shellCategory: "Converters",
    icon: <SwapHorizIcon fontSize="large" color="primary"/>,
    seoTitle: "ROT13 Encoder / Decoder - Free Online Cipher Tool",
    seoDescription: "Encode or decode ROT13 text instantly online. Since ROT13 is self-inverse, the same transform handles both directions. Free online tool.",
    keywords: ["rot13 decoder", "rot13 encoder", "rot13 converter", "rot13 cipher online", "rot13 translator"],
    ogTitle: "ROT13 Encoder / Decoder - Free Online Cipher Tool | ToolZoneX",
    ogDescription: "Encode or decode ROT13 text instantly online.",
    schemaName: "ROT13 Encoder / Decoder",
    schemaDescription: "Encode or decode ROT13 text instantly — since ROT13 is self-inverse, one box handles both directions.",
    applicationCategory: "EducationalApplication",
    currency: "INR",
    faqs: [{ question: "Why is there only one mode instead of separate Encode and Decode buttons?", answer: "Because ROT13 is a self-inverse (or \"involutive\") cipher — shifting a letter 13 places forward is exactly the same operation as shifting it 13 places back, since the alphabet has 26 letters and 13 is exactly half of that. Applying ROT13 twice to the same text always returns the original text, so encoding and decoding are literally the same transform. That's exactly what makes ROT13 a quick, reversible obfuscation trick rather than real encryption — anyone who knows it's ROT13 can reverse it instantly with no key required." }, { question: "Is ROT13 secure?", answer: "No — ROT13 provides no real security. It's meant only to casually hide text (like a spoiler or puzzle answer) from a quick glance, not to protect sensitive information from anyone who actually wants to read it." }, { question: "Does ROT13 affect numbers or punctuation?", answer: "No — only the 26 letters of the English alphabet (A-Z, a-z) are shifted. Numbers, spaces, and punctuation marks pass through completely unchanged." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
