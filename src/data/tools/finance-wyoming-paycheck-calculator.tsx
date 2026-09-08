import CalculateIcon from '@mui/icons-material/Calculate';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/wyoming-paycheck-calculator",
    navName: "Wyoming Paycheck Calculator",
    navDescription: "Take-home pay after federal tax & FICA in Wyoming.",
    name: "Wyoming Paycheck Calculator",
    description: "Take-home pay after federal tax & FICA in Wyoming.",
    navCategory: "Paycheck Calculators",
    shellCategory: "Finance",
    icon: <CalculateIcon fontSize="large" color="primary"/>,
    seoTitle: "Wyoming Paycheck Calculator - Take-Home Pay",
    seoDescription: "Free Wyoming paycheck calculator. Wyoming has no state income tax — see net pay after federal tax, Social Security, and Medicare.",
    keywords: ["wyoming paycheck calculator", "wyoming salary calculator", "wyoming take home pay", "wyoming tax calculator", "net pay calculator wyoming"],
    ogTitle: "Wyoming Paycheck Calculator - Take-Home Pay | ToolZoneX",
    ogDescription: "Free Wyoming paycheck calculator. Wyoming has no state income tax — see net pay after federal tax, Social Security, and Medicare.",
    schemaName: "Wyoming Paycheck Calculator",
    schemaDescription: "Estimate take-home pay in Wyoming after federal tax, Social Security, and Medicare.",
    applicationCategory: "FinanceApplication",
    currency: "USD",
    faqs: undefined,
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
