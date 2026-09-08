import PersonIcon from '@mui/icons-material/Person';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/generators/nickname-generator",
    navName: "Nickname Generator",
    navDescription: "Create nicknames from real names.",
    name: "Nickname Generator - Create Nicknames from Names",
    description: "Turn any real name into creative nicknames. Choose from classic, fun, cool, or cute styles with curated dictionary entries and rule-based transformations.",
    navCategory: "Generators",
    shellCategory: "Generators",
    icon: <PersonIcon fontSize="large" color="primary"/>,
    seoTitle: "Nickname Generator - Create Nicknames from Names",
    seoDescription: "Free online nickname generator. Enter a name and choose a style to get up to 20 nickname suggestions. Supports classic, fun, cool, and cute styles.",
    keywords: ["nickname generator", "nicknames from names", "create nickname", "nickname ideas", "fun nicknames", "cute nicknames", "cool nicknames"],
    ogTitle: "Nickname Generator - Create Nicknames from Names | ToolZoneX",
    ogDescription: "Turn any real name into creative nicknames. Free online generator with classic, fun, cool, and cute styles.",
    schemaName: "Nickname Generator",
    schemaDescription: "Create creative nicknames from real names with style-based transformations.",
    applicationCategory: "UtilitiesApplication",
    currency: undefined,
    faqs: undefined,
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
