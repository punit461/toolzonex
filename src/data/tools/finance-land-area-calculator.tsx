import HomeWorkIcon from '@mui/icons-material/HomeWork';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/land-area-calculator",
    navName: "Land Area Calculator",
    navDescription: "Convert between land area units instantly.",
    name: "Land Area Calculator",
    description: "Convert between square feet, square metres, acres, hectares, bigha, guntha, and ground.",
    navCategory: "Finance",
    shellCategory: "Finance",
    icon: <HomeWorkIcon fontSize="large" color="primary"/>,
    seoTitle: "Land Area Calculator - Convert Area Units Online",
    seoDescription: "Free land area calculator to convert between sq ft, sq m, acres, hectares, bigha, guntha, and ground. Ideal for Indian real estate.",
    keywords: ["land area calculator", "area converter", "square feet to acre", "bigha calculator", "hectare calculator", "square metre to square feet", "guntha calculator"],
    ogTitle: "Land Area Calculator - Convert Area Units Online | ToolZoneX",
    ogDescription: "Convert between sq ft, sq m, acres, hectares, bigha, guntha, and ground instantly.",
    schemaName: "Land Area Calculator",
    schemaDescription: "Convert between land area units including sq ft, acres, hectares, bigha, and guntha.",
    applicationCategory: "UtilityApplication",
    currency: undefined,
    faqs: [{ question: "Why are bigha and guntha included?", answer: "These units are commonly used in Indian real estate and agricultural land transactions." }, { question: "How accurate is the conversion?", answer: "Conversion factors are standardised. Minor regional variations may exist for units like bigha." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
