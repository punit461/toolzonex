import PublicIcon from '@mui/icons-material/Public';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/converters/url-decoder",
    navName: "URL Decoder",
    navDescription: "Decode URL-encoded text.",
    name: "URL Decoder",
    description: "Decode a URL-encoded (percent-encoded) string back to plain text instantly. Free, single-purpose online URL decoder.",
    navCategory: "Converters",
    shellCategory: "Converters",
    icon: <PublicIcon fontSize="large" color="primary"/>,
    seoTitle: "URL Decoder - Decode URL Encoded Strings Online",
    seoDescription: "Free online URL decoder. Paste a percent-encoded string and instantly get the decoded plain text — no encode mode, no sign-up, no upload.",
    keywords: ["url decoder", "decode url", "url decode online", "percent decode", "decode url encoded string"],
    ogTitle: "URL Decoder - Decode URL Encoded Strings Online | ToolZoneX",
    ogDescription: "Paste a percent-encoded string and instantly get the decoded plain text.",
    schemaName: "URL Decoder",
    schemaDescription: "Decode a URL-encoded (percent-encoded) string back to plain text instantly.",
    applicationCategory: "DeveloperApplication",
    currency: "INR",
    faqs: [{ question: "Why do I see % symbols followed by two characters in encoded URLs?", answer: "URL encoding replaces unsafe or reserved characters with a % followed by their two-digit hexadecimal code — for example, a space becomes %20. Decoding reverses this back to the original character." }, { question: "Why does decoding sometimes fail?", answer: "Decoding fails if the string contains a stray % that isn't followed by two valid hexadecimal digits, since that isn't valid percent-encoding — double-check the string was copied in full." }, { question: "Does this tool also encode text into a URL-safe format?", answer: "This page is decode-only, for a simpler, focused experience. Use our combined URL Encode/Decode tool if you need to encode plain text for use in a URL." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
