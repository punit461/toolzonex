import SecurityIcon from '@mui/icons-material/Security';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/developer-tools/sha512-hash-generator",
    navName: "SHA-512 Hash Generator",
    navDescription: "Generate a SHA-512 hash from any text.",
    name: "SHA-512 Hash Generator",
    description: "Generate the SHA-512 hash of any text instantly using the Web Crypto API. Free online SHA-512 hash generator.",
    navCategory: "Developer Tools",
    shellCategory: "Developer Tools",
    icon: <SecurityIcon fontSize="large" color="primary"/>,
    seoTitle: "SHA-512 Hash Generator - Free Online SHA512 Checksum Tool",
    seoDescription: "Free online SHA-512 hash generator. Type or paste any text to instantly compute its 128-character SHA-512 hex digest using the Web Crypto API.",
    keywords: ["sha512 hash generator", "sha-512 checksum generator", "sha512 online", "generate sha512 hash", "sha512 calculator"],
    ogTitle: "SHA-512 Hash Generator - Free Online SHA512 Checksum Tool | ToolZoneX",
    ogDescription: "Generate the SHA-512 hash of any text instantly in your browser.",
    schemaName: "SHA-512 Hash Generator",
    schemaDescription: "Generate the SHA-512 hash of any text instantly using the Web Crypto API.",
    applicationCategory: "DeveloperApplication",
    currency: "INR",
    faqs: [{ question: "How is SHA-512 different from SHA-256?", answer: "Both belong to the SHA-2 family and use a similar design, but SHA-512 operates on 64-bit words instead of 32-bit words and produces a 512-bit (128 hex character) digest instead of a 256-bit (64 hex character) one. On 64-bit hardware, SHA-512 can actually run faster than SHA-256 despite the longer output." }, { question: "Is SHA-512 secure for passwords?", answer: "No — like SHA-256, SHA-512 is designed to be fast, which makes it a poor fit for password storage on its own. Use a slow, salted algorithm such as bcrypt or Argon2 for passwords instead." }, { question: "Is my text uploaded anywhere?", answer: "No — hashing happens entirely client-side using the browser's native Web Crypto API. Nothing you type is sent to a server." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
