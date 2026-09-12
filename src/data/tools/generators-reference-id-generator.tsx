import TagIcon from '@mui/icons-material/Tag';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/generators/reference-id-generator",
    navName: "Reference/Order ID Generator",
    navDescription: "Generate configurable reference, order, or serial IDs.",
    name: "Reference/Order ID Generator - Configurable Unique IDs",
    description: "Generate configurable reference numbers, order IDs, token numbers, or serial numbers with a custom prefix, length, character set, and optional embedded date.",
    navCategory: "Generators",
    shellCategory: "Generators",
    icon: <TagIcon fontSize="large" color="primary"/>,
    seoTitle: "Reference/Order ID Generator - Configurable Unique IDs",
    seoDescription: "Free online reference and order ID generator. Create configurable IDs with a custom prefix, length, character set, and optional embedded date.",
    keywords: ["reference id generator", "order id generator online", "serial number generator", "token number generator", "unique id generator"],
    ogTitle: "Reference/Order ID Generator - Configurable Unique IDs | ToolZoneX",
    ogDescription: "Create configurable reference, order, serial, or token IDs with a custom prefix and format.",
    schemaName: "Reference/Order ID Generator",
    schemaDescription: "Generate configurable reference numbers, order IDs, token numbers, or serial numbers with a custom prefix, length, character set, and optional embedded date.",
    applicationCategory: "DeveloperApplication",
    currency: undefined,
    faqs: [{ question: "How random is the generated portion?", answer: "It uses the Web Crypto API's crypto.getRandomValues(), giving cryptographically strong randomness rather than a predictable pseudo-random sequence." }, { question: "Could two generated IDs ever collide?", answer: "It's possible but extremely unlikely with a reasonably long random portion (8+ characters) — for guaranteed uniqueness in a production system, still check new IDs against your existing records." }, { question: "What's the difference between this and a UUID generator?", answer: "A UUID follows a strict, universally standardized 36-character format. This tool instead lets you fully customize the prefix, length, character set, and date component to match your own business ID conventions." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
