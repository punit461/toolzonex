import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/developer-tools/uuid-validator",
    navName: "UUID Validator",
    navDescription: "Validate a UUID and detect its version.",
    name: "UUID Validator & Version Detector",
    description: "Paste any UUID/GUID to check whether it's valid format and detect which version it is. Free online UUID validator.",
    navCategory: "Developer Tools",
    shellCategory: "Developer Tools",
    icon: <VerifiedUserIcon fontSize="large" color="primary"/>,
    seoTitle: "UUID Validator - Check Format & Detect Version Online",
    seoDescription: "Free online UUID validator. Paste any UUID/GUID to instantly check whether it's in valid format and detect which version (v1 through v5) it is.",
    keywords: ["uuid validator", "validate uuid online", "uuid version checker", "guid validator", "check uuid format"],
    ogTitle: "UUID Validator - Check Format & Detect Version Online | ToolZoneX",
    ogDescription: "Paste any UUID/GUID to check its format and detect its version.",
    schemaName: "UUID Validator & Version Detector",
    schemaDescription: "Paste any UUID/GUID to check whether it's valid format and detect which version it is.",
    applicationCategory: "DeveloperApplication",
    currency: "INR",
    faqs: [{ question: "How is the UUID version detected?", answer: "The version number is encoded as the first hex digit of the third group (position 15 of the string). For example, in xxxxxxxx-xxxx-4xxx-xxxx-xxxxxxxxxxxx, the leading \"4\" marks it as version 4." }, { question: "What's the difference between a UUID and a GUID?", answer: "They're effectively the same thing — GUID (Globally Unique Identifier) is Microsoft's name for the same 128-bit identifier format standardized as UUID in RFC 4122." }, { question: "Is my UUID uploaded anywhere?", answer: "No — validation happens entirely client-side in your browser. Nothing you paste is sent to a server." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
