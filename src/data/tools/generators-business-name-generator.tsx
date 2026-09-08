import TextFormatIcon from '@mui/icons-material/TextFormat';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/generators/business-name-generator",
    navName: "Business Name",
    navDescription: "Generate startup name ideas.",
    name: "Business Name Generator",
    description: "Generate catchy and brandable business names, app names, and startup ideas instantly.",
    navCategory: "Generators",
    shellCategory: "Generators",
    icon: <TextFormatIcon fontSize="large" color="primary"/>,
    seoTitle: "Business Name Generator - Startup & App Name Ideas Online",
    seoDescription: "Generate catchy and brandable business names, app names, and startup ideas instantly. Free online name creator.",
    keywords: ["business name generator", "startup name generator", "app name generator", "company name ideas", "brand name generator"],
    ogTitle: "Business Name Generator - Startup & App Name Ideas Online | ToolZoneX",
    ogDescription: "Generate catchy and brandable business names, app names, and startup ideas instantly.",
    schemaName: "Business Name Generator",
    schemaDescription: "Generate catchy and brandable business names, app names, and startup ideas instantly.",
    applicationCategory: "BusinessApplication",
    currency: "INR",
    faqs: undefined,
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
