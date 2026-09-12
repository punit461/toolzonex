import CalculateIcon from '@mui/icons-material/Calculate';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/utah-paycheck-calculator",
    navName: "Utah Paycheck Calculator",
    navDescription: "Take-home pay after federal tax & FICA in Utah.",
    name: "Utah Paycheck Calculator",
    description: "Take-home pay after federal tax & FICA in Utah.",
    navCategory: "Paycheck Calculators",
    shellCategory: "Finance",
    icon: <CalculateIcon fontSize="large" color="primary"/>,
    seoTitle: "Utah Paycheck Calculator - Take-Home Pay",
    seoDescription: "Free Utah paycheck calculator. See net pay after federal tax, state tax, Social Security, and Medicare.",
    keywords: ["utah paycheck calculator", "utah salary calculator", "utah take home pay", "utah tax calculator", "net pay calculator utah"],
    ogTitle: "Utah Paycheck Calculator - Take-Home Pay | ToolZoneX",
    ogDescription: "Free Utah paycheck calculator. See net pay after federal tax, state tax, Social Security, and Medicare.",
    schemaName: "Utah Paycheck Calculator",
    schemaDescription: "Estimate take-home pay in Utah after federal tax, Social Security, and Medicare.",
    applicationCategory: "FinanceApplication",
    currency: "USD",
    faqs: undefined,
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
