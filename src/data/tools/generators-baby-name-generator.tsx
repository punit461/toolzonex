import ChildFriendlyIcon from '@mui/icons-material/ChildFriendly';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/generators/baby-name-generator",
    navName: "Baby Name Generator",
    navDescription: "Find baby name ideas with meanings.",
    name: "Baby Name Generator - Find Baby Names Ideas",
    description: "Discover the perfect baby name from a curated list of Indian and Western names. Filter by gender, origin, and starting letter to find names with meanings.",
    navCategory: "Generators",
    shellCategory: "Generators",
    icon: <ChildFriendlyIcon fontSize="large" color="primary"/>,
    seoTitle: "Baby Name Generator - Find Baby Names Ideas",
    seoDescription: "Free online baby name generator with 50+ curated Indian and Western names. Filter by gender, origin, and starting letter to find names with beautiful meanings.",
    keywords: ["baby name generator", "baby names", "baby name ideas", "Indian baby names", "Western baby names", "baby names with meanings", "unique baby names"],
    ogTitle: "Baby Name Generator - Find Baby Names Ideas | ToolZoneX",
    ogDescription: "Discover baby names from a curated list of Indian and Western names with meanings. Free online generator.",
    schemaName: "Baby Name Generator",
    schemaDescription: "Find baby name ideas from a curated list of Indian and Western names with meanings.",
    applicationCategory: "UtilitiesApplication",
    currency: undefined,
    faqs: undefined,
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
