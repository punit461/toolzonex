import SecurityIcon from '@mui/icons-material/Security';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/developer-tools/ripemd160-generator",
    navName: "RIPEMD-160 Generator",
    navDescription: "Generate a RIPEMD-160 hash from any text.",
    name: "RIPEMD-160 Generator",
    description: "Generate the RIPEMD-160 hash of any text instantly using a verified pure JavaScript implementation (RIPEMD-160 isn't in the Web Crypto API).",
    navCategory: "Developer Tools",
    shellCategory: "Developer Tools",
    icon: <SecurityIcon fontSize="large" color="primary"/>,
    seoTitle: "RIPEMD-160 Generator - Free Online RIPEMD160 Hash Tool",
    seoDescription: "Free online RIPEMD-160 generator. Type or paste any text to instantly compute its 40-character RIPEMD-160 hex digest.",
    keywords: ["ripemd160 generator", "ripemd-160 hash generator", "ripemd160 online", "generate ripemd160 hash", "ripemd160 calculator"],
    ogTitle: "RIPEMD-160 Generator - Free Online RIPEMD160 Hash Tool | ToolZoneX",
    ogDescription: "Generate the RIPEMD-160 hash of any text instantly in your browser.",
    schemaName: "RIPEMD-160 Generator",
    schemaDescription: "Generate the RIPEMD-160 hash of any text instantly using a verified pure JavaScript implementation of the RIPEMD-160 algorithm.",
    applicationCategory: "DeveloperApplication",
    currency: "INR",
    faqs: [{ question: "Why isn't RIPEMD-160 available through the browser's built-in crypto?", answer: "The Web Crypto API's crypto.subtle.digest only supports the SHA family (SHA-1, SHA-256, SHA-384, SHA-512) — RIPEMD-160 was never included in the standard. This tool implements the algorithm directly in JavaScript, verified against the official published test vectors, to fill that gap." }, { question: "Where is RIPEMD-160 still used today?", answer: "It's most notably used inside Bitcoin and several other cryptocurrencies as part of generating shorter public-key hashes (typically as RIPEMD-160 applied to a SHA-256 digest), and it remains supported in various cryptographic libraries for legacy compatibility." }, { question: "Is my text uploaded anywhere?", answer: "No — hashing happens entirely client-side in your browser using the JavaScript implementation on this page. Nothing you type is sent to a server." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
