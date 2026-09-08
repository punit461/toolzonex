import CalculateIcon from '@mui/icons-material/Calculate';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/ohio-paycheck-calculator",
    navName: "Ohio Paycheck Calculator",
    navDescription: "Take-home pay after federal tax & FICA in Ohio.",
    name: "Ohio Paycheck Calculator",
    description: "Take-home pay after federal tax & FICA in Ohio.",
    navCategory: "Paycheck Calculators",
    shellCategory: "Finance",
    icon: <CalculateIcon fontSize="large" color="primary"/>,
    seoTitle: "Ohio Paycheck Calculator - Estimate Your Take-Home Pay",
    seoDescription: "Free Ohio paycheck calculator with 2025 state tax brackets. See net pay after federal tax, Ohio state tax, Social Security, and Medicare.",
    keywords: ["ohio paycheck calculator", "ohio salary calculator", "ohio take home pay", "ohio tax calculator", "net pay calculator ohio"],
    ogTitle: "Ohio Paycheck Calculator - Estimate Your Take-Home Pay | ToolZoneX",
    ogDescription: "Free Ohio paycheck calculator with 2025 federal tax brackets and Ohio state tax.",
    schemaName: "Ohio Paycheck Calculator",
    schemaDescription: "Estimate take-home pay in Ohio after federal tax, state tax, Social Security, and Medicare.",
    applicationCategory: "FinanceApplication",
    currency: "USD",
    faqs: undefined,
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
