import SecurityIcon from '@mui/icons-material/Security';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/developer-tools/jwt-decoder",
    navName: "JWT Decoder",
    navDescription: "Decode JSON Web Tokens securely.",
    name: "JWT Decoder",
    description: "Decode JSON Web Tokens (JWT) safely and securely in your browser. Free online developer tool with no server-side tracking.",
    navCategory: "Developer Tools",
    shellCategory: "Developer Tools",
    icon: <SecurityIcon fontSize="large" color="primary"/>,
    seoTitle: "JWT Decoder - Secure Online Token Viewer",
    seoDescription: "Decode JSON Web Tokens (JWT) safely and securely in your browser. Free online developer tool with no server-side tracking.",
    keywords: ["jwt decoder", "json web token decoder", "decode jwt online", "jwt viewer", "jwt parser"],
    ogTitle: "JWT Decoder - Secure Online Token Viewer | ToolZoneX",
    ogDescription: "Decode JSON Web Tokens (JWT) safely and securely in your browser.",
    schemaName: "JWT Decoder",
    schemaDescription: "Decode JSON Web Tokens (JWT) safely and securely in your browser.",
    applicationCategory: "DeveloperApplication",
    currency: "INR",
    faqs: undefined,
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
