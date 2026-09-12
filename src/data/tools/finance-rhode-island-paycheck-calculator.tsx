import CalculateIcon from '@mui/icons-material/Calculate';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/rhode-island-paycheck-calculator",
    navName: "Rhode Island Paycheck Calculator",
    navDescription: "Take-home pay after federal tax & FICA in Rhode Island.",
    name: "Rhode Island Paycheck Calculator",
    description: "Take-home pay after federal tax & FICA in Rhode Island.",
    navCategory: "Paycheck Calculators",
    shellCategory: "Finance",
    icon: <CalculateIcon fontSize="large" color="primary"/>,
    seoTitle: "Rhode Island Paycheck Calculator - Estimate Your Take-Home Pay",
    seoDescription: "Free Rhode Island paycheck calculator with 2025 state tax brackets. See net pay after federal tax, Rhode Island state tax, Social Security, and Medicare.",
    keywords: ["rhode island paycheck calculator", "rhode island salary calculator", "rhode island take home pay", "rhode island tax calculator", "net pay calculator rhode island"],
    ogTitle: "Rhode Island Paycheck Calculator - Estimate Your Take-Home Pay | ToolZoneX",
    ogDescription: "Free Rhode Island paycheck calculator with 2025 federal tax brackets and Rhode Island state tax.",
    schemaName: "Rhode Island Paycheck Calculator",
    schemaDescription: "Estimate take-home pay in Rhode Island after federal tax, state tax, Social Security, and Medicare.",
    applicationCategory: "FinanceApplication",
    currency: "USD",
    faqs: undefined,
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
