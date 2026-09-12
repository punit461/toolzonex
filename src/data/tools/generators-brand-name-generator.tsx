import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/generators/brand-name-generator",
    navName: "Brand Name Generator",
    navDescription: "Generate brand name ideas from keywords.",
    name: "Brand Name Generator - Create Business Name Ideas",
    description: "Enter keywords describing your business and get 20 unique brand name ideas instantly. Combines your keywords with catchy prefixes, suffixes, and blends.",
    navCategory: "Generators",
    shellCategory: "Generators",
    icon: <AutoAwesomeIcon fontSize="large" color="primary"/>,
    seoTitle: "Brand Name Generator - Create Business Name Ideas",
    seoDescription: "Free online brand name generator. Enter keywords and get 20 unique brand name ideas with catchy prefixes, suffixes, and blends.",
    keywords: ["brand name generator", "business name generator", "company name ideas", "startup name generator"],
    ogTitle: "Brand Name Generator - Create Business Name Ideas | ToolZoneX",
    ogDescription: "Enter keywords and get 20 unique brand name ideas instantly. Free online brand name generator.",
    schemaName: "Brand Name Generator",
    schemaDescription: "Enter keywords describing your business and get 20 unique brand name ideas instantly.",
    applicationCategory: "UtilityApplication",
    currency: undefined,
    faqs: undefined,
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
