import CalculateIcon from '@mui/icons-material/Calculate';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/virginia-paycheck-calculator",
    navName: "Virginia Paycheck Calculator",
    navDescription: "Take-home pay after federal tax & FICA in Virginia.",
    name: "Virginia Paycheck Calculator",
    description: "Take-home pay after federal tax & FICA in Virginia.",
    navCategory: "Paycheck Calculators",
    shellCategory: "Finance",
    icon: <CalculateIcon fontSize="large" color="primary"/>,
    seoTitle: "Virginia Paycheck Calculator - Estimate Your Take-Home Pay",
    seoDescription: "Free Virginia paycheck calculator with 2025 state tax brackets. See net pay after federal tax, Virginia state tax, Social Security, and Medicare.",
    keywords: ["virginia paycheck calculator", "virginia salary calculator", "virginia take home pay", "virginia tax calculator", "net pay calculator virginia"],
    ogTitle: "Virginia Paycheck Calculator - Estimate Your Take-Home Pay | ToolZoneX",
    ogDescription: "Free Virginia paycheck calculator with 2025 federal tax brackets and Virginia state tax.",
    schemaName: "Virginia Paycheck Calculator",
    schemaDescription: "Estimate take-home pay in Virginia after federal tax, state tax, Social Security, and Medicare.",
    applicationCategory: "FinanceApplication",
    currency: "USD",
    faqs: undefined,
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
