import FingerprintIcon from '@mui/icons-material/Fingerprint';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/generators/uuid-generator",
    navName: "UUID Generator",
    navDescription: "Generate v4 UUIDs.",
    name: "UUID / GUID Generator",
    description: "Generate cryptographically secure v4 UUIDs instantly online. Free bulk UUID generator.",
    navCategory: "Generators",
    shellCategory: "Generators",
    icon: <FingerprintIcon fontSize="large" color="primary"/>,
    seoTitle: "UUID / GUID Generator - Create Secure v4 UUIDs Online",
    seoDescription: "Generate cryptographically secure v4 UUIDs instantly online. Free bulk UUID generator using secure web cryptography.",
    keywords: ["uuid generator", "guid generator", "v4 uuid", "generate uuid", "bulk uuid generator"],
    ogTitle: "UUID / GUID Generator - Create Secure v4 UUIDs Online | ToolZoneX",
    ogDescription: "Generate cryptographically secure v4 UUIDs instantly online.",
    schemaName: "UUID / GUID Generator",
    schemaDescription: "Generate cryptographically secure v4 UUIDs instantly online.",
    applicationCategory: "DeveloperApplication",
    currency: "INR",
    faqs: undefined,
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
