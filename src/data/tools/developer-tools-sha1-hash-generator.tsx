import FingerprintIcon from '@mui/icons-material/Fingerprint';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/developer-tools/sha1-hash-generator",
    navName: "SHA-1 Hash Generator",
    navDescription: "Generate a SHA-1 hash from any text.",
    name: "SHA-1 Hash Generator",
    description: "Generate the SHA-1 hash of any text instantly using the Web Crypto API. Free online SHA-1 hash generator.",
    navCategory: "Developer Tools",
    shellCategory: "Developer Tools",
    icon: <FingerprintIcon fontSize="large" color="primary"/>,
    seoTitle: "SHA-1 Hash Generator - Free Online SHA1 Checksum Tool",
    seoDescription: "Free online SHA-1 hash generator. Type or paste any text to instantly compute its 40-character SHA-1 hex digest using the Web Crypto API.",
    keywords: ["sha1 hash generator", "sha-1 checksum generator", "sha1 online", "generate sha1 hash", "sha1 calculator"],
    ogTitle: "SHA-1 Hash Generator - Free Online SHA1 Checksum Tool | ToolZoneX",
    ogDescription: "Generate the SHA-1 hash of any text instantly in your browser.",
    schemaName: "SHA-1 Hash Generator",
    schemaDescription: "Generate the SHA-1 hash of any text instantly using the Web Crypto API.",
    applicationCategory: "DeveloperApplication",
    currency: undefined,
    faqs: [{ question: "Is SHA-1 secure for passwords?", answer: "No — like MD5, SHA-1 is fast to compute and has known collision attacks, which makes plain SHA-1 a poor fit for password storage. Real systems should use a slow, salted algorithm such as bcrypt or Argon2 instead." }, { question: "Is my text uploaded anywhere?", answer: "No — hashing happens entirely client-side using the browser's native Web Crypto API. Nothing you type is sent to a server." }, { question: "How is SHA-1 different from SHA-256?", answer: "SHA-1 produces a shorter 160-bit digest and has publicly demonstrated collision attacks, while SHA-256 produces a longer 256-bit digest with no known practical attacks — which is why SHA-256 is generally preferred for anything security-sensitive today." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
