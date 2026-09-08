import SecurityIcon from '@mui/icons-material/Security';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/converters/caesar-cipher-encoder-decoder",
    navName: "Caesar Cipher Encoder/Decoder",
    navDescription: "Encode or decode text with any shift amount, 1-25.",
    name: "Caesar Cipher Encoder/Decoder - Adjustable Shift",
    description: "Encode or decode text using the classic Caesar cipher with any adjustable shift amount from 1 to 25, with a mode toggle since arbitrary shifts aren't self-inverse.",
    navCategory: "Converters",
    shellCategory: "Converters",
    icon: <SecurityIcon fontSize="large" color="primary"/>,
    seoTitle: "Caesar Cipher Encoder/Decoder - Free Adjustable Shift Tool",
    seoDescription: "Free Caesar cipher encoder and decoder with an adjustable shift amount from 1 to 25. Encode or decode text instantly with any shift value.",
    keywords: ["caesar cipher encoder", "caesar cipher decoder", "caesar cipher translator", "shift cipher tool", "caesar cipher online"],
    ogTitle: "Caesar Cipher Encoder/Decoder - Free Adjustable Shift Tool | ToolZoneX",
    ogDescription: "Encode or decode text with any Caesar cipher shift amount from 1 to 25.",
    schemaName: "Caesar Cipher Encoder/Decoder",
    schemaDescription: "Encode or decode text using the classic Caesar cipher with any adjustable shift amount from 1 to 25.",
    applicationCategory: "EducationalApplication",
    currency: "INR",
    faqs: [{ question: "How is this different from the ROT13 Encoder/Decoder?", answer: "ROT13 is specifically the fixed 13-shift case of the Caesar cipher, which happens to be self-inverse — applying it twice returns the original text, so one box handles both directions. This tool allows any shift from 1 to 25, and since an arbitrary shift generally isn't self-inverse, it requires an explicit Encode/Decode mode toggle to pick the correct direction." }, { question: "What happens if I set the shift to exactly 13?", answer: "At a shift of 13, this tool behaves exactly like ROT13 — encoding and decoding become the same operation, since shifting forward 13 and shifting back 13 (26-13=13) are identical." }, { question: "Is the Caesar cipher secure?", answer: "No — with only 25 possible shifts, a Caesar cipher can be broken almost instantly by trying every shift value or using letter-frequency analysis. It's useful for learning and casual puzzles, not for protecting sensitive information." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
