import CalculateIcon from '@mui/icons-material/Calculate';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/west-virginia-paycheck-calculator",
    navName: "West Virginia Paycheck Calculator",
    navDescription: "Take-home pay after federal tax & FICA in West Virginia.",
    name: "West Virginia Paycheck Calculator",
    description: "Take-home pay after federal tax & FICA in West Virginia.",
    navCategory: "Paycheck Calculators",
    shellCategory: "Finance",
    icon: <CalculateIcon fontSize="large" color="primary"/>,
    seoTitle: "West Virginia Paycheck Calculator - Estimate Your Take-Home Pay",
    seoDescription: "Free West Virginia paycheck calculator with 2025 state tax brackets. See net pay after federal tax, West Virginia state tax, Social Security, and Medicare.",
    keywords: ["west virginia paycheck calculator", "west virginia salary calculator", "west virginia take home pay", "west virginia tax calculator", "net pay calculator west virginia"],
    ogTitle: "West Virginia Paycheck Calculator - Estimate Your Take-Home Pay | ToolZoneX",
    ogDescription: "Free West Virginia paycheck calculator with 2025 federal tax brackets and West Virginia state tax.",
    schemaName: "West Virginia Paycheck Calculator",
    schemaDescription: "Estimate take-home pay in West Virginia after federal tax, state tax, Social Security, and Medicare.",
    applicationCategory: "FinanceApplication",
    currency: "USD",
    faqs: undefined,
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
