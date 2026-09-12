import SecurityIcon from '@mui/icons-material/Security';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/developer-tools/sha224-hash-generator",
    navName: "SHA-224 Hash Generator",
    navDescription: "Generate a SHA-224 hash from any text.",
    name: "SHA-224 Hash Generator",
    description: "Generate the SHA-224 hash of any text instantly using a verified pure JavaScript implementation (SHA-224 isn't in the Web Crypto API).",
    navCategory: "Developer Tools",
    shellCategory: "Developer Tools",
    icon: <SecurityIcon fontSize="large" color="primary"/>,
    seoTitle: "SHA-224 Hash Generator - Free Online SHA224 Checksum Tool",
    seoDescription: "Free online SHA-224 hash generator. Type or paste any text to instantly compute its 56-character SHA-224 hex digest.",
    keywords: ["sha224 hash generator", "sha-224 checksum generator", "sha224 online", "generate sha224 hash", "sha224 calculator"],
    ogTitle: "SHA-224 Hash Generator - Free Online SHA224 Checksum Tool | ToolZoneX",
    ogDescription: "Generate the SHA-224 hash of any text instantly in your browser.",
    schemaName: "SHA-224 Hash Generator",
    schemaDescription: "Generate the SHA-224 hash of any text instantly using a verified pure JavaScript implementation of the SHA-224 algorithm.",
    applicationCategory: "DeveloperApplication",
    currency: "INR",
    faqs: [{ question: "Why isn't SHA-224 built into the browser like SHA-256?", answer: "The Web Crypto API's crypto.subtle.digest only implements SHA-1, SHA-256, SHA-384, and SHA-512 natively — SHA-224 was left out of the standard. This tool works around that by implementing the SHA-224 algorithm directly in JavaScript, verified against NIST's official test vectors." }, { question: "Is SHA-224 just a shortened SHA-256?", answer: "Essentially, yes for output length — it runs the identical round function and message schedule as SHA-256, but starts from a different set of eight initial hash values and only outputs the first seven of the eight resulting 32-bit words, giving 224 bits instead of 256." }, { question: "Is my text uploaded anywhere?", answer: "No — hashing happens entirely client-side in your browser using the JavaScript implementation on this page. Nothing you type is sent to a server." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
