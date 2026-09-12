import SecurityIcon from '@mui/icons-material/Security';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/developer-tools/adler32-generator",
    navName: "Adler-32 Generator",
    navDescription: "Generate an Adler-32 checksum from any text.",
    name: "Adler-32 Generator",
    description: "Generate the Adler-32 checksum of any text instantly using a pure JavaScript implementation, verified against the standard's published test vectors.",
    navCategory: "Developer Tools",
    shellCategory: "Developer Tools",
    icon: <SecurityIcon fontSize="large" color="primary"/>,
    seoTitle: "Adler-32 Generator - Free Online Adler32 Checksum Tool",
    seoDescription: "Free online Adler-32 checksum generator. Type or paste any text to instantly compute its 8-character Adler-32 hex checksum.",
    keywords: ["adler32 generator", "adler-32 checksum generator", "adler32 online", "generate adler32 checksum", "adler32 calculator"],
    ogTitle: "Adler-32 Generator - Free Online Adler32 Checksum Tool | ToolZoneX",
    ogDescription: "Generate the Adler-32 checksum of any text instantly in your browser.",
    schemaName: "Adler-32 Generator",
    schemaDescription: "Generate the Adler-32 checksum of any text instantly using a pure JavaScript implementation of the Adler-32 algorithm.",
    applicationCategory: "DeveloperApplication",
    currency: "INR",
    faqs: [{ question: "Is Adler-32 a cryptographic hash?", answer: "No — Adler-32 is a simple checksum designed for fast error detection, not security. It is not resistant to intentional tampering and should never be used for password storage, digital signatures, or any security-sensitive purpose. Use SHA-256 or SHA-512 for those." }, { question: "How is Adler-32 different from a CRC checksum?", answer: "Both are fast, non-cryptographic checksums used for error detection, but they use different mathematical constructions. Adler-32 is generally faster to compute in software than CRC-32, though CRC-32 offers somewhat stronger error-detection guarantees for certain error patterns — Adler-32 is famously used inside the zlib compression library specifically for its speed." }, { question: "Is my text uploaded anywhere?", answer: "No — the checksum is computed entirely client-side in your browser. Nothing you type is sent to a server." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
