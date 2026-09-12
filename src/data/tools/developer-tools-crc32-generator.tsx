import FingerprintIcon from '@mui/icons-material/Fingerprint';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/developer-tools/crc32-generator",
    navName: "CRC32 Generator",
    navDescription: "Compute a CRC-32 checksum of text.",
    name: "CRC32 Generator",
    description: "Compute the CRC-32 (IEEE 802.3 / zlib) checksum of any text, live-updating as you type.",
    navCategory: "Developer Tools",
    shellCategory: "Developer Tools",
    icon: <FingerprintIcon fontSize="large" color="primary"/>,
    seoTitle: "CRC32 Generator - Compute CRC-32 Checksum Online",
    seoDescription: "Free CRC32 generator. Compute the CRC-32 (IEEE 802.3 / zlib) checksum of any text instantly, entirely in your browser.",
    keywords: ["crc32 generator", "crc32 checksum calculator", "crc32 online", "crc-32 hash generator", "checksum generator"],
    ogTitle: "CRC32 Generator - Compute CRC-32 Checksum Online | ToolZoneX",
    ogDescription: "Compute the CRC-32 checksum of any text instantly.",
    schemaName: "CRC32 Generator",
    schemaDescription: "Compute the CRC-32 (IEEE 802.3 / zlib) checksum of UTF-8 encoded text.",
    applicationCategory: "DeveloperApplication",
    currency: "INR",
    faqs: [{ question: "Is CRC-32 the same as a cryptographic hash like SHA-256?", answer: "No — CRC-32 is designed for fast error detection (catching accidental corruption), not security. It is not collision-resistant against a deliberate attacker, so it should never be used to verify data integrity against tampering or for password hashing. Use SHA-256 or a similar cryptographic hash function for security-sensitive purposes." }, { question: "Why does this tool use UTF-8 encoding before hashing?", answer: "CRC-32 operates on raw bytes, not characters, so the input text must first be converted to bytes. UTF-8 is the standard, most widely compatible text encoding, matching what most CRC-32 implementations in other languages and tools use by default." }, { question: "Does this match the CRC-32 value used by ZIP or PNG files?", answer: "Yes — this tool implements the IEEE 802.3 / zlib CRC-32 variant (polynomial 0xEDB88320), which is the same variant used by the ZIP file format, PNG chunk checksums, and gzip. Some other systems use different CRC polynomials, which would produce different results for the same input." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
