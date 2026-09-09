import HomeWorkIcon from '@mui/icons-material/HomeWork';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/rent-vs-buy-calculator",
    navName: "Rent vs Buy Calculator",
    navDescription: "Is buying always better than renting?",
    name: "Rent vs Buy Calculator",
    description: "Compare the financial costs of renting versus buying a home over time.",
    navCategory: "Finance",
    shellCategory: "Finance",
    icon: <HomeWorkIcon fontSize="large" color="primary"/>,
    seoTitle: "Rent vs Buy Calculator - Make Smart Property Decisions",
    seoDescription: "Free rent vs buy calculator to compare renting vs buying a home. Make informed property decisions with this comprehensive financial comparison tool.",
    keywords: ["rent vs buy calculator", "rent or buy", "property decision", "home loan vs rent", "real estate calculator", "property investment"],
    ogTitle: "Rent vs Buy Calculator - Make Smart Property Decisions | ToolZoneX",
    ogDescription: "Compare renting vs buying a home with this comprehensive calculator.",
    schemaName: "Rent vs Buy Calculator",
    schemaDescription: "Compare renting vs buying a home.",
    applicationCategory: "FinanceApplication",
    currency: "INR",
    faqs: [{ question: "Does this account for home maintenance and property tax?", answer: "The calculator focuses on the core EMI-vs-rent and equity comparison — ongoing costs like maintenance, property tax, and insurance add to the true cost of owning and aren't included by default." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
