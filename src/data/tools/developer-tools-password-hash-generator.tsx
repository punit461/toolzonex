import VpnKeyIcon from '@mui/icons-material/VpnKey';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/developer-tools/password-hash-generator",
    navName: "Password Hash Generator",
    navDescription: "Hash a password with MD5, SHA-1, or SHA-256.",
    name: "Password Hash Generator (Educational)",
    description: "Hash a password with MD5, SHA-1, or SHA-256 to see what a raw, unsalted hash looks like. Free online educational tool.",
    navCategory: "Developer Tools",
    shellCategory: "Developer Tools",
    icon: <VpnKeyIcon fontSize="large" color="primary"/>,
    seoTitle: "Password Hash Generator - MD5, SHA-1 & SHA-256 (Educational)",
    seoDescription: "Free online password hash generator for learning and testing. Hash a password with MD5, SHA-1, or SHA-256 and see the raw hex digest computed live in your browser.",
    keywords: ["password hash generator", "hash a password online", "sha256 password hash", "md5 password hash", "password hashing tool"],
    ogTitle: "Password Hash Generator - MD5, SHA-1 & SHA-256 (Educational) | ToolZoneX",
    ogDescription: "Hash a password with MD5, SHA-1, or SHA-256 for learning and testing.",
    schemaName: "Password Hash Generator",
    schemaDescription: "Hash a password with MD5, SHA-1, or SHA-256 to see what a raw, unsalted hash looks like.",
    applicationCategory: "DeveloperApplication",
    currency: "INR",
    faqs: [{ question: "Is this how real systems should store passwords?", answer: "No. A plain MD5, SHA-1, or SHA-256 hash of a password is fast to compute — which means an attacker with a leaked database can try billions of guesses per second against it. Real systems must use a slow, purpose-built, salted algorithm like bcrypt, scrypt, or Argon2, which are deliberately expensive to brute-force and include a unique salt per user to defeat precomputed lookup tables. This tool exists purely to show what a raw hash looks like, for learning and testing." }, { question: "What does \"salted\" mean?", answer: "A salt is random data mixed into the password before hashing, unique per user. It ensures two users with the same password get different hashes, and defeats precomputed \"rainbow table\" attacks. This tool does not add a salt — it hashes the raw password only, for demonstration purposes." }, { question: "Is my password uploaded anywhere?", answer: "No — hashing happens entirely client-side in your browser. Nothing you type is sent to a server. Still, avoid entering a real password you actually use anywhere else." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
