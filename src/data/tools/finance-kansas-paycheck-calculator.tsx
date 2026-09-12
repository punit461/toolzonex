import CalculateIcon from '@mui/icons-material/Calculate';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/kansas-paycheck-calculator",
    navName: "Kansas Paycheck Calculator",
    navDescription: "Take-home pay after federal tax & FICA in Kansas.",
    name: "Kansas Paycheck Calculator",
    description: "Take-home pay after federal tax & FICA in Kansas.",
    navCategory: "Paycheck Calculators",
    shellCategory: "Finance",
    icon: <CalculateIcon fontSize="large" color="primary"/>,
    seoTitle: "Kansas Paycheck Calculator - Estimate Your Take-Home Pay",
    seoDescription: "Free Kansas paycheck calculator with 2025 state tax brackets. See net pay after federal tax, Kansas state tax, Social Security, and Medicare.",
    keywords: ["kansas paycheck calculator", "kansas salary calculator", "kansas take home pay", "kansas tax calculator", "net pay calculator kansas"],
    ogTitle: "Kansas Paycheck Calculator - Estimate Your Take-Home Pay | ToolZoneX",
    ogDescription: "Free Kansas paycheck calculator with 2025 federal tax brackets and Kansas state tax.",
    schemaName: "Kansas Paycheck Calculator",
    schemaDescription: "Estimate take-home pay in Kansas after federal tax, state tax, Social Security, and Medicare.",
    applicationCategory: "FinanceApplication",
    currency: "USD",
    faqs: undefined,
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
