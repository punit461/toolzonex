import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/generators/username-generator",
    navName: "Username Generator",
    navDescription: "Create unique usernames from keywords.",
    name: "Username Generator - Create Unique Usernames",
    description: "Generate unique username ideas from any keyword or name. Choose from cool, cute, professional, or gaming styles with smart prefix and suffix combinations.",
    navCategory: "Generators",
    shellCategory: "Generators",
    icon: <AlternateEmailIcon fontSize="large" color="primary"/>,
    seoTitle: "Username Generator - Create Unique Usernames",
    seoDescription: "Free online username generator. Enter a keyword and choose a style to get 20 unique username suggestions with prefixes, suffixes, and numbers.",
    keywords: ["username generator", "username ideas", "cool usernames", "gaming username", "unique username", "username creator", "name generator"],
    ogTitle: "Username Generator - Create Unique Usernames | ToolZoneX",
    ogDescription: "Generate unique username ideas from keywords. Choose from cool, cute, professional, or gaming styles.",
    schemaName: "Username Generator",
    schemaDescription: "Generate unique username suggestions from keywords with style-based combinations.",
    applicationCategory: "UtilitiesApplication",
    currency: undefined,
    faqs: undefined,
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
