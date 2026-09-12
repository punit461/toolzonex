import CalculateIcon from '@mui/icons-material/Calculate';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/paycheck-calculator",
    navName: "Paycheck Calculator",
    navDescription: "US take-home pay by state, after federal tax & FICA.",
    name: "Paycheck Calculator",
    description: "US take-home pay by state, after federal tax & FICA.",
    navCategory: "Paycheck Calculators",
    shellCategory: "Finance",
    icon: <CalculateIcon fontSize="large" color="primary"/>,
    seoTitle: "US Paycheck Calculator by State - Take-Home Pay",
    seoDescription: "Free paycheck calculators for US states. Estimate your take-home pay after federal tax, Social Security, Medicare, and state income tax.",
    keywords: ["paycheck calculator by state", "us salary calculator", "take home pay calculator", "state paycheck calculator"],
    ogTitle: "US Paycheck Calculator by State | ToolZoneX",
    ogDescription: "Free paycheck calculators for US states. Estimate your take-home pay after taxes.",
    schemaName: undefined,
    schemaDescription: undefined,
    applicationCategory: undefined,
    currency: undefined,
    faqs: undefined,
    extraSchemaFields: undefined,
    isHub: true,
    noindex: true,
};

export default tool;
