import VpnKeyIcon from '@mui/icons-material/VpnKey';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/generators/secure-token-generator",
    navName: "Secure Token Generator",
    navDescription: "Generate random secure tokens.",
    name: "Secure Token Generator",
    description: "Generate cryptographically random tokens in Hex, Base64, Base64URL, or Base62 for sessions, CSRF tokens, and reset links.",
    navCategory: "Generators",
    shellCategory: "Generators",
    icon: <VpnKeyIcon fontSize="large" color="primary"/>,
    seoTitle: "Secure Token Generator - Random Tokens Online",
    seoDescription: "Generate cryptographically random tokens in Hex, Base64, Base64URL, or Base62 formats. Free online secure token generator using Web Crypto.",
    keywords: ["secure token generator", "random token generator", "session token generator", "csrf token generator", "generate random token"],
    ogTitle: "Secure Token Generator - Random Tokens Online | ToolZoneX",
    ogDescription: "Generate cryptographically random tokens in Hex, Base64, Base64URL, or Base62 formats.",
    schemaName: "Secure Token Generator",
    schemaDescription: "Generate cryptographically random tokens in Hex, Base64, Base64URL, or Base62 for sessions, CSRF tokens, and reset links.",
    applicationCategory: "DeveloperApplication",
    currency: "INR",
    faqs: [{ question: "How is this different from the API Key Generator?", answer: "The API Key Generator produces prefixed, API-key-shaped strings (like sk_live_...) meant specifically to look and function like an API auth key. This Secure Token Generator produces a raw, unprefixed random token with no built-in structure — better suited for general-purpose uses like session tokens, CSRF tokens, or password-reset links where you don't need a recognizable prefix." }, { question: "Which encoding format should I use?", answer: "Hex is the most universally compatible and easiest to read. Base64 packs more entropy per character but includes symbols like + and / that aren't always URL-safe. Base64URL fixes that for use in URLs. Base62 uses only letters and digits, which is convenient when a system doesn't allow any special characters at all." }, { question: "Is Base62 encoding perfectly uniform?", answer: "It's a simple modulo mapping of each random byte onto a 62-character alphabet, which introduces a very slight statistical bias since 256 isn't evenly divisible by 62. For this tool's purpose — generating usable random tokens — that tiny bias is not a practical concern." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
