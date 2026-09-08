import ShuffleIcon from '@mui/icons-material/Shuffle';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/generators/random-letter-generator",
    navName: "Random Letter Generator",
    navDescription: "Generate random letters, upper/lower/mixed case.",
    name: "Random Letter Generator",
    description: "Generate cryptographically secure random letters in uppercase, lowercase, or mixed case, with optional numbers.",
    navCategory: "Generators",
    shellCategory: "Generators",
    icon: <ShuffleIcon fontSize="large" color="primary"/>,
    seoTitle: "Random Letter Generator - Generate Random Letters Online",
    seoDescription: "Free random letter generator to create cryptographically secure random letters in uppercase, lowercase, or mixed case, with optional numbers included.",
    keywords: ["random letter generator", "generate random letters", "random letters online", "random alphabet generator", "random character generator"],
    ogTitle: "Random Letter Generator - Generate Random Letters Online | ToolZoneX",
    ogDescription: "Generate cryptographically secure random letters in uppercase, lowercase, or mixed case.",
    schemaName: "Random Letter Generator",
    schemaDescription: "Generate cryptographically secure random letters in uppercase, lowercase, or mixed case, with optional numbers.",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: [{ question: "Is this truly random?", answer: "Yes — the tool uses the Web Crypto API (crypto.getRandomValues) which provides cryptographically secure random numbers." }, { question: "What's the maximum I can generate?", answer: "You can generate up to 1,000 characters at once." }, { question: "Can I generate random letters and numbers?", answer: "Yes — check the \"Include Numbers\" option to add digits 0-9 to the character pool." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
