import VpnKeyIcon from '@mui/icons-material/VpnKey';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/text-tools/password-hint-generator",
    navName: "Password Hint Generator",
    navDescription: "Get a memory hint without revealing your password.",
    name: "Password Hint Generator",
    description: "Generate a personal memory hint for a password — showing only its length, first/last character, and structure — entirely in your browser, without saving or transmitting it.",
    navCategory: "Text Tools",
    shellCategory: "Text Tools",
    icon: <VpnKeyIcon fontSize="large" color="primary"/>,
    seoTitle: "Password Hint Generator - Remember Passwords Safely",
    seoDescription: "Free password hint generator. Get a memory hint for your password — length, first/last character, and structure — processed entirely client-side.",
    keywords: ["password hint generator", "password memory aid", "password reminder tool", "password structure hint", "secure password hint"],
    ogTitle: "Password Hint Generator - Remember Passwords Safely | ToolZoneX",
    ogDescription: "Get a client-side memory hint for your password without revealing it.",
    schemaName: "Password Hint Generator",
    schemaDescription: "Generate a personal memory hint for a password — showing only its length, first/last character, and structure — entirely in your browser, without saving or transmitting it.",
    applicationCategory: "UtilityApplication",
    currency: undefined,
    faqs: [{ question: "Is my password saved or sent anywhere?", answer: "No — this tool runs entirely in your browser using client-side JavaScript. Your password is never transmitted to any server, stored in a database, or logged anywhere. It exists only in your browser's memory for as long as the page is open, purely as an in-the-moment memory aid." }, { question: "Does the hint reveal my actual password?", answer: "No — it deliberately shows only partial information (first/last character, length, and structure) rather than the password itself, so someone seeing the hint alone couldn't reconstruct your full password." }, { question: "Should I store this hint somewhere permanent?", answer: "Treat it the same way you would any password-related note — keep it somewhere private, and consider using a proper password manager instead for long-term, secure password storage." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
