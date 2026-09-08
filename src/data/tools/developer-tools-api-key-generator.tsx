import VpnKeyIcon from '@mui/icons-material/VpnKey';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/developer-tools/api-key-generator",
    navName: "API Key Generator",
    navDescription: "Create secure random API keys.",
    name: "API Key Generator",
    description: "Generate strong random API keys for development and testing. Free online API key generator with prefixes and character sets.",
    navCategory: "Developer Tools",
    shellCategory: "Developer Tools",
    icon: <VpnKeyIcon fontSize="large" color="primary"/>,
    seoTitle: "API Key Generator - Secure Random Keys",
    seoDescription: "Free online API key generator. Create secure random API keys with prefixes and configurable character sets, in batches of five.",
    keywords: ["api key generator", "generate api key", "random api key", "secure key generator", "api key example", "token generator"],
    ogTitle: "API Key Generator - Secure Random Keys | ToolZoneX",
    ogDescription: "Generate secure, random API keys for your projects in seconds.",
    schemaName: "API Key Generator",
    schemaDescription: "Generate random API keys with configurable prefixes and character sets.",
    applicationCategory: "DeveloperApplication",
    currency: "USD",
    faqs: [{ question: "Are generated keys truly secure?", answer: "The generator draws from the browser's cryptographically secure random source, not Math.random, so keys are suitable for development and testing. Still, prefer a server-side generator or a cloud KMS for production secrets." }, { question: "Should these keys be used in production?", answer: "They work, but production keys are better generated and stored by your cloud provider or secret manager so they are never exposed in client-side code or logs. Use this tool for prototyping, local config, and tests." }, { question: "What is the best character set?", answer: "Base64url (A–Z, a–z, 0–9, -, _) packs the most entropy per character. Hex halves are quicker to read but weaker for the same length; symbols can break URLs unless URL-encoded." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
