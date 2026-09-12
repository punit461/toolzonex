import CalculateIcon from '@mui/icons-material/Calculate';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/delaware-paycheck-calculator",
    navName: "Delaware Paycheck Calculator",
    navDescription: "Take-home pay after federal tax & FICA in Delaware.",
    name: "Delaware Paycheck Calculator",
    description: "Take-home pay after federal tax & FICA in Delaware.",
    navCategory: "Paycheck Calculators",
    shellCategory: "Finance",
    icon: <CalculateIcon fontSize="large" color="primary"/>,
    seoTitle: "Delaware Paycheck Calculator - Estimate Your Take-Home Pay",
    seoDescription: "Free Delaware paycheck calculator with 2025 state tax brackets. See net pay after federal tax, Delaware state tax, Social Security, and Medicare.",
    keywords: ["delaware paycheck calculator", "delaware salary calculator", "delaware take home pay", "delaware tax calculator", "net pay calculator delaware"],
    ogTitle: "Delaware Paycheck Calculator - Estimate Your Take-Home Pay | ToolZoneX",
    ogDescription: "Free Delaware paycheck calculator with 2025 federal tax brackets and Delaware state tax.",
    schemaName: "Delaware Paycheck Calculator",
    schemaDescription: "Estimate take-home pay in Delaware after federal tax, state tax, Social Security, and Medicare.",
    applicationCategory: "FinanceApplication",
    currency: "USD",
    faqs: undefined,
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
