import HomeWorkIcon from '@mui/icons-material/HomeWork';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/mortgage-calculator",
    navName: "US Mortgage Calculator",
    navDescription: "Monthly payment (PITI) with tax, insurance & PMI.",
    name: "US Mortgage Calculator",
    description: "Estimate your full monthly mortgage payment (PITI) with property tax, insurance, PMI, and a year-by-year amortization chart.",
    navCategory: "Finance",
    shellCategory: "Finance",
    icon: <HomeWorkIcon fontSize="large" color="primary"/>,
    seoTitle: "US Mortgage Calculator - Monthly Payment (PITI) & Amortization",
    seoDescription: "Free US mortgage calculator with property tax, home insurance, PMI, and HOA. See your full monthly payment (PITI) and a year-by-year amortization chart.",
    keywords: ["mortgage calculator", "US mortgage calculator", "PITI calculator", "monthly mortgage payment", "amortization calculator", "PMI calculator", "home loan calculator"],
    ogTitle: "US Mortgage Calculator - Monthly Payment (PITI) & Amortization | ToolZoneX",
    ogDescription: "Free US mortgage calculator with property tax, home insurance, PMI, and HOA.",
    schemaName: "US Mortgage Calculator",
    schemaDescription: "Estimate your full monthly mortgage payment (PITI) with property tax, insurance, PMI, and a year-by-year amortization chart.",
    applicationCategory: "FinanceApplication",
    currency: "USD",
    faqs: undefined,
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
