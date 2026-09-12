import SecurityIcon from '@mui/icons-material/Security';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/developer-tools/sha256-hash-generator",
    navName: "SHA-256 Hash Generator",
    navDescription: "Generate a SHA-256 hash from any text.",
    name: "SHA-256 Hash Generator",
    description: "Generate the SHA-256 hash of any text instantly using the Web Crypto API. Free online SHA-256 hash generator.",
    navCategory: "Developer Tools",
    shellCategory: "Developer Tools",
    icon: <SecurityIcon fontSize="large" color="primary"/>,
    seoTitle: "SHA-256 Hash Generator - Free Online SHA256 Checksum Tool",
    seoDescription: "Free online SHA-256 hash generator. Type or paste any text to instantly compute its 64-character SHA-256 hex digest using the Web Crypto API.",
    keywords: ["sha256 hash generator", "sha-256 checksum generator", "sha256 online", "generate sha256 hash", "sha256 calculator"],
    ogTitle: "SHA-256 Hash Generator - Free Online SHA256 Checksum Tool | ToolZoneX",
    ogDescription: "Generate the SHA-256 hash of any text instantly in your browser.",
    schemaName: "SHA-256 Hash Generator",
    schemaDescription: "Generate the SHA-256 hash of any text instantly using the Web Crypto API.",
    applicationCategory: "DeveloperApplication",
    currency: "INR",
    faqs: [{ question: "Is SHA-256 secure for passwords?", answer: "SHA-256 is cryptographically strong but, like MD5 and SHA-1, is designed to be fast — which makes plain SHA-256 a poor fit for password storage. Real systems should use a slow, salted algorithm such as bcrypt or Argon2 instead." }, { question: "Is my text uploaded anywhere?", answer: "No — hashing happens entirely client-side using the browser's native Web Crypto API. Nothing you type is sent to a server." }, { question: "How is SHA-256 different from MD5?", answer: "SHA-256 produces a longer, more collision-resistant digest and has no known practical attacks, unlike MD5, which is considered cryptographically broken." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
