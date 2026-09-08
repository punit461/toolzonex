import FingerprintIcon from '@mui/icons-material/Fingerprint';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/generators/guid-generator",
    navName: "GUID Generator",
    navDescription: "Generate GUID/UUID v4 strings.",
    name: "GUID Generator",
    description: "Generate cryptographically secure GUID/UUID v4 strings with optional braces and case formatting.",
    navCategory: "Generators",
    shellCategory: "Generators",
    icon: <FingerprintIcon fontSize="large" color="primary"/>,
    seoTitle: "GUID Generator - Create GUID / UUID v4 Strings Online",
    seoDescription: "Free GUID generator to create cryptographically secure GUID/UUID v4 strings in bulk, with optional braces and uppercase or lowercase formatting.",
    keywords: ["guid generator", "generate guid", "guid online", "uuid v4 generator", "bulk guid generator", "globally unique identifier generator"],
    ogTitle: "GUID Generator - Create GUID / UUID v4 Strings Online | ToolZoneX",
    ogDescription: "Generate cryptographically secure GUID/UUID v4 strings in bulk, with optional braces and case formatting.",
    schemaName: "GUID Generator",
    schemaDescription: "Generate cryptographically secure GUID/UUID v4 strings with optional braces and case formatting.",
    applicationCategory: "DeveloperApplication",
    currency: "INR",
    faqs: [{ question: "Are generated GUIDs truly unique?", answer: "UUID v4 uses 122 random bits, making collisions statistically impossible for any practical number of generated values." }, { question: "What's the difference between GUID and UUID?", answer: "They are the same thing. GUID is Microsoft's term; UUID is the general standard (RFC 4122)." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
