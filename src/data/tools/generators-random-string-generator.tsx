import TextFormatIcon from '@mui/icons-material/TextFormat';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/generators/random-string-generator",
    navName: "Random String",
    navDescription: "Generate random strings.",
    name: "Random String Generator",
    description: "Generate random alphanumeric strings securely online. Free bulk random text generator.",
    navCategory: "Generators",
    shellCategory: "Generators",
    icon: <TextFormatIcon fontSize="large" color="primary"/>,
    seoTitle: "Random String Generator - Create Alphanumeric Strings Online",
    seoDescription: "Generate random alphanumeric strings securely online. Free bulk random text generator for passwords, tokens, and testing.",
    keywords: ["random string generator", "generate string", "alphanumeric generator", "random text generator", "secure string generator", "generate random alphanumeric", "random alphanumeric character generator", "generate string online", "random sting generator"],
    ogTitle: "Random String Generator - Create Alphanumeric Strings Online | ToolZoneX",
    ogDescription: "Generate random alphanumeric strings securely online. Free bulk random text generator.",
    schemaName: "Random String Generator",
    schemaDescription: "Generate random alphanumeric strings securely online.",
    applicationCategory: "DeveloperApplication",
    currency: "INR",
    faqs: [{ question: "How do I generate random alphanumeric strings online?", answer: "Keep \"Uppercase Letters\", \"Lowercase Letters\", and \"Numbers\" checked (and leave Symbols unchecked) to use this as a random alphanumeric character generator — set your desired length and quantity, then click Generate. Since everything runs in your browser, it works as a way to generate string online with no download or sign-up." }, { question: "Can I restrict output to a custom set of characters?", answer: "Yes — enter your own character set in the \"Custom Characters\" field and the generator will draw exclusively from that combined pool (or from just your custom set if you uncheck the built-in options)." }, { question: "Is this generator cryptographically secure?", answer: "Yes. It uses the Web Crypto API's crypto.getRandomValues() rather than Math.random(), so the output has cryptographic-grade randomness — suitable for tokens, API keys, and other secret values, not just cosmetic placeholders." }, { question: "What's the maximum length and quantity I can generate?", answer: "Up to 1000 characters per string and up to 1000 strings in a single batch, all generated locally in your browser with no server round-trip." }, { question: "What's the difference between this and a UUID generator?", answer: "A UUID follows a fixed 36-character format (8-4-4-4-12 hex digits) designed to guarantee global uniqueness across systems. This tool instead produces strings of any length and character set you choose — better suited for custom-length tokens, test data, or codes that need to match a specific format." }, { question: "Does generating many strings at once risk duplicates?", answer: "For any reasonable string length (8+ characters from a mixed character set), the chance of two identical strings appearing even across the maximum batch of 1000 is negligible — each character is drawn independently using a cryptographically secure random source." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
