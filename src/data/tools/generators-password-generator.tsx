import SecurityIcon from '@mui/icons-material/Security';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/generators/password-generator",
    navName: "Password Generator",
    navDescription: "Generate secure passwords.",
    name: "Secure Password Generator",
    description: "Generate strong, secure, and random passwords instantly. Client-side tool that never sends your data to any server.",
    navCategory: "Generators",
    shellCategory: "Generators",
    icon: <SecurityIcon fontSize="large" color="primary"/>,
    seoTitle: "Secure Password Generator - Strong Random Passwords Online",
    seoDescription: "Generate strong, secure, and random passwords instantly. Client-side tool that never sends your data to any server.",
    keywords: ["password generator", "strong password", "secure password", "random password generator", "generate secure password"],
    ogTitle: "Secure Password Generator - Strong Random Passwords Online | ToolZoneX",
    ogDescription: "Generate strong, secure, and random passwords instantly. Client-side tool that never sends your data to any server.",
    schemaName: "Secure Password Generator",
    schemaDescription: "Generate strong, secure, and random passwords instantly.",
    applicationCategory: "SecurityApplication",
    currency: "INR",
    faqs: undefined,
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
