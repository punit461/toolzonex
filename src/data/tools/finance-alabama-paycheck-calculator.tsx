import CalculateIcon from '@mui/icons-material/Calculate';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/alabama-paycheck-calculator",
    navName: "Alabama Paycheck Calculator",
    navDescription: "Take-home pay after federal tax & FICA in Alabama.",
    name: "Alabama Paycheck Calculator",
    description: "Take-home pay after federal tax & FICA in Alabama.",
    navCategory: "Paycheck Calculators",
    shellCategory: "Finance",
    icon: <CalculateIcon fontSize="large" color="primary"/>,
    seoTitle: "Alabama Paycheck Calculator - Estimate Your Take-Home Pay",
    seoDescription: "Free Alabama paycheck calculator with 2025 state tax brackets. See net pay after federal tax, Alabama state tax, Social Security, and Medicare.",
    keywords: ["alabama paycheck calculator", "alabama salary calculator", "alabama take home pay", "alabama tax calculator", "net pay calculator alabama"],
    ogTitle: "Alabama Paycheck Calculator - Estimate Your Take-Home Pay | ToolZoneX",
    ogDescription: "Free Alabama paycheck calculator with 2025 federal tax brackets and Alabama state tax.",
    schemaName: "Alabama Paycheck Calculator",
    schemaDescription: "Estimate take-home pay in Alabama after federal tax, state tax, Social Security, and Medicare.",
    applicationCategory: "FinanceApplication",
    currency: "USD",
    faqs: undefined,
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
