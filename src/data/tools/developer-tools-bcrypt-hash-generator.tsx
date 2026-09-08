import VpnKeyIcon from '@mui/icons-material/VpnKey';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/developer-tools/bcrypt-hash-generator",
    navName: "BCrypt Hash Generator",
    navDescription: "Generate a secure bcrypt password hash.",
    name: "BCrypt Hash Generator",
    description: "Generate a bcrypt hash from plain text using the audited bcryptjs library, with an adjustable cost factor and a new random salt on every generation.",
    navCategory: "Developer Tools",
    shellCategory: "Developer Tools",
    icon: <VpnKeyIcon fontSize="large" color="primary"/>,
    seoTitle: "BCrypt Hash Generator - Free Online BCrypt Password Hasher",
    seoDescription: "Free online bcrypt hash generator. Generate a secure bcrypt password hash with an adjustable cost factor, powered by the audited bcryptjs library.",
    keywords: ["bcrypt hash generator", "bcrypt online", "bcrypt password hasher", "generate bcrypt hash", "bcrypt cost factor calculator"],
    ogTitle: "BCrypt Hash Generator - Free Online BCrypt Password Hasher | ToolZoneX",
    ogDescription: "Generate a secure bcrypt password hash with an adjustable cost factor.",
    schemaName: "BCrypt Hash Generator",
    schemaDescription: "Generate a bcrypt hash from plain text using the audited bcryptjs library, with an adjustable cost factor and a new random salt on every generation.",
    applicationCategory: "DeveloperApplication",
    currency: "USD",
    faqs: [{ question: "Why use bcrypt instead of a general-purpose hash like SHA-256?", answer: "Bcrypt is specifically designed for PASSWORD hashing — unlike general-purpose checksums like SHA-256 or CRC32, which are built to be fast, bcrypt is deliberately slow and has a built-in random salt baked into every hash. This combination makes brute-force and rainbow-table attacks far harder against bcrypt hashes than against a fast, unsalted hash." }, { question: "Why does clicking Generate produce a different hash every time, even with the same input?", answer: "This is expected bcrypt behavior, not a bug — bcrypt automatically generates a new random salt each time you hash, and that salt is embedded directly in the resulting hash string. Two different hashes of the same password can both still be correctly verified against that same password." }, { question: "Is my text sent to a server?", answer: "No — hashing happens entirely in your browser using the bcryptjs JavaScript library. Nothing you type is uploaded anywhere." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
