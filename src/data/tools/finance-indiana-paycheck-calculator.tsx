import CalculateIcon from '@mui/icons-material/Calculate';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/indiana-paycheck-calculator",
    navName: "Indiana Paycheck Calculator",
    navDescription: "Take-home pay after federal tax & FICA in Indiana.",
    name: "Indiana Paycheck Calculator",
    description: "Take-home pay after federal tax & FICA in Indiana.",
    navCategory: "Paycheck Calculators",
    shellCategory: "Finance",
    icon: <CalculateIcon fontSize="large" color="primary"/>,
    seoTitle: "Indiana Paycheck Calculator - Take-Home Pay",
    seoDescription: "Free Indiana paycheck calculator. See net pay after federal tax, state tax, Social Security, and Medicare.",
    keywords: ["indiana paycheck calculator", "indiana salary calculator", "indiana take home pay", "indiana tax calculator", "net pay calculator indiana"],
    ogTitle: "Indiana Paycheck Calculator - Take-Home Pay | ToolZoneX",
    ogDescription: "Free Indiana paycheck calculator. See net pay after federal tax, state tax, Social Security, and Medicare.",
    schemaName: "Indiana Paycheck Calculator",
    schemaDescription: "Estimate take-home pay in Indiana after federal tax, Social Security, and Medicare.",
    applicationCategory: "FinanceApplication",
    currency: "USD",
    faqs: undefined,
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
