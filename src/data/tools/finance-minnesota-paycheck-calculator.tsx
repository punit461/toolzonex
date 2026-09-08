import CalculateIcon from '@mui/icons-material/Calculate';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/minnesota-paycheck-calculator",
    navName: "Minnesota Paycheck Calculator",
    navDescription: "Take-home pay after federal tax & FICA in Minnesota.",
    name: "Minnesota Paycheck Calculator",
    description: "Take-home pay after federal tax & FICA in Minnesota.",
    navCategory: "Paycheck Calculators",
    shellCategory: "Finance",
    icon: <CalculateIcon fontSize="large" color="primary"/>,
    seoTitle: "Minnesota Paycheck Calculator - Estimate Your Take-Home Pay",
    seoDescription: "Free Minnesota paycheck calculator with 2025 state tax brackets. See net pay after federal tax, Minnesota state tax, Social Security, and Medicare.",
    keywords: ["minnesota paycheck calculator", "minnesota salary calculator", "minnesota take home pay", "minnesota tax calculator", "net pay calculator minnesota"],
    ogTitle: "Minnesota Paycheck Calculator - Estimate Your Take-Home Pay | ToolZoneX",
    ogDescription: "Free Minnesota paycheck calculator with 2025 federal tax brackets and Minnesota state tax.",
    schemaName: "Minnesota Paycheck Calculator",
    schemaDescription: "Estimate take-home pay in Minnesota after federal tax, state tax, Social Security, and Medicare.",
    applicationCategory: "FinanceApplication",
    currency: "USD",
    faqs: undefined,
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
