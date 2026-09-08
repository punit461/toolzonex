import TagIcon from '@mui/icons-material/Tag';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/generators/random-hash-generator",
    navName: "Random Hash Generator",
    navDescription: "Random hex/alphanumeric identifiers.",
    name: "Random Hash Generator - Hex & Alphanumeric",
    description: "Generate a random hash-like string in hex or alphanumeric format at a chosen length, using crypto.getRandomValues for genuine randomness.",
    navCategory: "Generators",
    shellCategory: "Generators",
    icon: <TagIcon fontSize="large" color="primary"/>,
    seoTitle: "Random Hash Generator - Hex & Alphanumeric Strings",
    seoDescription: "Generate a random hash-like string in hex or alphanumeric format at 16, 32, or 64 characters. Free online tool for test IDs and tokens.",
    keywords: ["random hash generator", "random hex string generator", "random token generator", "random identifier generator"],
    ogTitle: "Random Hash Generator - Hex & Alphanumeric Strings | ToolZoneX",
    ogDescription: "Generate a random hash-like string in hex or alphanumeric format at a chosen length.",
    schemaName: "Random Hash Generator",
    schemaDescription: "Generate a random hash-like string in hex or alphanumeric format at a chosen length, using crypto.getRandomValues for genuine randomness.",
    applicationCategory: "DeveloperApplication",
    currency: "INR",
    faqs: [{ question: "Is this a real hash of something I typed?", answer: "No — this tool does not accept any input to hash. It generates a random-looking string for use as a test identifier or token, not a cryptographic hash of actual data." }, { question: "How random is the output?", answer: "It uses your browser's crypto.getRandomValues API, a cryptographically secure random number source, rather than the weaker Math.random()." }, { question: "Can two generated hashes be the same?", answer: "It's possible in theory, but extremely unlikely at 32 or 64 characters — the pool of possible combinations is astronomically large." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
