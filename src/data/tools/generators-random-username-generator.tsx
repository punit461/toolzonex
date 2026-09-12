import PersonIcon from '@mui/icons-material/Person';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/generators/random-username-generator",
    navName: "Random Username Generator",
    navDescription: "One-click random usernames.",
    name: "Random Username Generator - Instant Usernames",
    description: "Generate random usernames instantly by combining adjectives and nouns, with an optional number and multi-generate support.",
    navCategory: "Generators",
    shellCategory: "Generators",
    icon: <PersonIcon fontSize="large" color="primary"/>,
    seoTitle: "Random Username Generator - Instant Usernames",
    seoDescription: "Generate random usernames instantly by combining adjectives and nouns, with an optional number. Free online tool, generate multiple at once.",
    keywords: ["random username generator", "instant username generator", "generate random username", "username idea generator"],
    ogTitle: "Random Username Generator - Instant Usernames | ToolZoneX",
    ogDescription: "Generate random usernames instantly by combining adjectives and nouns, with an optional number.",
    schemaName: "Random Username Generator",
    schemaDescription: "Generate random usernames instantly by combining adjectives and nouns, with an optional number and multi-generate support.",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: [{ question: "How is this different from the Username Generator?", answer: "The Username Generator builds variations around a keyword you type in. This Random Username Generator needs no input at all — just click and get a fully random adjective-noun combination." }, { question: "Are these usernames guaranteed to be available?", answer: "No — this tool only generates a random combination of words and numbers; it doesn't check availability on any specific platform." }, { question: "Can I generate more than one at a time?", answer: "Yes — set the \"How many\" field to any number up to 20 to get a batch of options in one click." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
