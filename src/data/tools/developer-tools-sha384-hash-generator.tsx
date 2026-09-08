import SecurityIcon from '@mui/icons-material/Security';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/developer-tools/sha384-hash-generator",
    navName: "SHA-384 Hash Generator",
    navDescription: "Generate a SHA-384 hash from any text.",
    name: "SHA-384 Hash Generator",
    description: "Generate the SHA-384 hash of any text instantly using the Web Crypto API. Free online SHA-384 hash generator.",
    navCategory: "Developer Tools",
    shellCategory: "Developer Tools",
    icon: <SecurityIcon fontSize="large" color="primary"/>,
    seoTitle: "SHA-384 Hash Generator - Free Online SHA384 Checksum Tool",
    seoDescription: "Free online SHA-384 hash generator. Type or paste any text to instantly compute its 96-character SHA-384 hex digest using the Web Crypto API.",
    keywords: ["sha384 hash generator", "sha-384 checksum generator", "sha384 online", "generate sha384 hash", "sha384 calculator"],
    ogTitle: "SHA-384 Hash Generator - Free Online SHA384 Checksum Tool | ToolZoneX",
    ogDescription: "Generate the SHA-384 hash of any text instantly in your browser.",
    schemaName: "SHA-384 Hash Generator",
    schemaDescription: "Generate the SHA-384 hash of any text instantly using the Web Crypto API.",
    applicationCategory: "DeveloperApplication",
    currency: "INR",
    faqs: [{ question: "How is SHA-384 different from SHA-512?", answer: "SHA-384 uses the exact same internal algorithm as SHA-512 but starts from different initial hash values and simply truncates the final 512-bit result down to 384 bits (96 hex characters). It is not a completely separate algorithm — it's SHA-512 with a shorter, distinct output." }, { question: "Why would someone use SHA-384 instead of SHA-256 or SHA-512?", answer: "SHA-384 is commonly required by specific standards and protocols (such as certain TLS cipher suites and certificate fingerprint formats) that call for it by name, and it offers a security margin between SHA-256 and full SHA-512 with a fixed 96-character output." }, { question: "Is my text uploaded anywhere?", answer: "No — hashing happens entirely client-side using the browser's native Web Crypto API. Nothing you type is sent to a server." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
