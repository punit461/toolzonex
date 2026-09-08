import VpnKeyIcon from '@mui/icons-material/VpnKey';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/generators/random-pin-generator",
    navName: "Random PIN Generator",
    navDescription: "Secure random numeric PIN, 4-12 digits.",
    name: "Random PIN Generator",
    description: "Generate a secure, random, strictly numeric PIN of 4-12 digits using cryptographically secure randomness.",
    navCategory: "Generators",
    shellCategory: "Generators",
    icon: <VpnKeyIcon fontSize="large" color="primary"/>,
    seoTitle: "Random PIN Generator - Secure Numeric PIN Codes",
    seoDescription: "Free random PIN generator. Generate a secure, random numeric PIN of 4 to 12 digits using cryptographically secure randomness.",
    keywords: ["random pin generator", "pin generator", "numeric pin generator", "generate secure pin", "random pin code"],
    ogTitle: "Random PIN Generator - Secure Numeric PIN Codes | ToolZoneX",
    ogDescription: "Generate a secure, random numeric PIN of 4 to 12 digits.",
    schemaName: "Random PIN Generator",
    schemaDescription: "Generate a secure, random, strictly numeric PIN of 4-12 digits using cryptographically secure randomness.",
    applicationCategory: "SecurityApplication",
    currency: "INR",
    faqs: [{ question: "How is this different from the Password Generator?", answer: "The Password Generator creates longer, mixed-character passwords that can include uppercase and lowercase letters, numbers, and symbols — built for account security. This Random PIN Generator is strictly numeric and shorter (4-12 digits), matching the format required by PIN-style use cases like device unlock codes, safe combinations, or numeric access codes, where only digits are accepted." }, { question: "Is this PIN generator secure?", answer: "Yes — it uses crypto.getRandomValues, the same cryptographically secure randomness source used by security-focused tools, rather than Math.random(), which is not suitable for anything security-related. Everything runs locally in your browser; no PIN is ever sent anywhere." }, { question: "What's the most secure PIN length?", answer: "Longer is generally more secure against guessing — a 4-digit PIN has only 10,000 possible combinations, while a 6-digit PIN has 1,000,000. Use the longest PIN length your device or system allows for better protection." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
