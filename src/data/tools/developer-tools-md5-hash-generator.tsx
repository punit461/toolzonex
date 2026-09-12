import FingerprintIcon from '@mui/icons-material/Fingerprint';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/developer-tools/md5-hash-generator",
    navName: "MD5 Hash Generator",
    navDescription: "Generate an MD5 hash from any text.",
    name: "MD5 Hash Generator",
    description: "Generate the MD5 hash of any text instantly, entirely in your browser. Free online MD5 hash generator.",
    navCategory: "Developer Tools",
    shellCategory: "Developer Tools",
    icon: <FingerprintIcon fontSize="large" color="primary"/>,
    seoTitle: "MD5 Hash Generator - Free Online MD5 Checksum Tool",
    seoDescription: "Free online MD5 hash generator. Type or paste any text to instantly compute its 32-character MD5 hex digest, entirely in your browser.",
    keywords: ["md5 hash generator", "md5 checksum generator", "md5 online", "generate md5 hash", "md5 calculator"],
    ogTitle: "MD5 Hash Generator - Free Online MD5 Checksum Tool | ToolZoneX",
    ogDescription: "Generate the MD5 hash of any text instantly in your browser.",
    schemaName: "MD5 Hash Generator",
    schemaDescription: "Generate the MD5 hash of any text instantly, entirely in your browser.",
    applicationCategory: "DeveloperApplication",
    currency: "INR",
    faqs: [{ question: "Is MD5 secure for passwords?", answer: "No — MD5 is cryptographically broken and far too fast to resist brute-force attacks. Never use plain MD5 to store real passwords; use a slow, salted algorithm like bcrypt or Argon2 instead." }, { question: "Is my text uploaded anywhere?", answer: "No — the hash is computed entirely client-side in your browser using a hand-implemented MD5 algorithm. Nothing you type is sent to a server." }, { question: "Why does MD5 still exist if it's broken?", answer: "It remains useful for non-security purposes like checksums, cache keys, and detecting accidental data corruption, where resistance to deliberate attacks doesn't matter." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
