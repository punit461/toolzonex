import TagIcon from '@mui/icons-material/Tag';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/generators/nano-id-generator",
    navName: "Nano ID Generator",
    navDescription: "Generate short, URL-safe unique IDs.",
    name: "Nano ID Generator",
    description: "Generate short, URL-safe, customizable-length unique IDs using unbiased rejection sampling over a secure random source.",
    navCategory: "Generators",
    shellCategory: "Generators",
    icon: <TagIcon fontSize="large" color="primary"/>,
    seoTitle: "Nano ID Generator - Short, URL-Safe Unique ID Generator",
    seoDescription: "Free Nano ID generator. Create short, URL-safe, customizable-length unique IDs using cryptographically secure, unbiased random generation.",
    keywords: ["nano id generator", "nanoid generator", "url safe id generator", "short unique id generator", "custom alphabet id generator"],
    ogTitle: "Nano ID Generator - Short, URL-Safe Unique ID Generator | ToolZoneX",
    ogDescription: "Generate short, URL-safe, customizable-length unique IDs.",
    schemaName: "Nano ID Generator",
    schemaDescription: "Generate short, URL-safe, customizable-length unique IDs using unbiased rejection sampling over a secure random source.",
    applicationCategory: "DeveloperApplication",
    currency: "INR",
    faqs: [{ question: "How is a Nano ID different from a UUID?", answer: "A UUID is a fixed 36-character format with hyphens and specific version/variant bits baked in, always the same length regardless of use case. A Nano ID is shorter by default, fully customizable in length and character set, and URL-safe out of the box — which is why it's commonly used for IDs that show up directly in URLs or database keys in modern web apps." }, { question: "Is a shorter Nano ID less safe from collisions than a UUID?", answer: "At the default 21-character length with the 64-character alphabet, collision probability is still astronomically low for virtually any realistic application — comparable in practice to UUID v4. Shortening the length or alphabet further trades off some collision resistance for a shorter ID, so pick a length appropriate to how many IDs you expect to generate." }, { question: "Why does the alphabet need to be unbiased?", answer: "If you map a random byte onto the alphabet with a plain modulo operation, characters near the start of the alphabet get selected very slightly more often whenever 256 isn't evenly divisible by the alphabet length. Rejection sampling discards those uneven leftover byte values instead of using them, so every character has exactly equal probability." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
