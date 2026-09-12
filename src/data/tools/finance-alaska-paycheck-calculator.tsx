import CalculateIcon from '@mui/icons-material/Calculate';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/alaska-paycheck-calculator",
    navName: "Alaska Paycheck Calculator",
    navDescription: "Take-home pay after federal tax & FICA in Alaska.",
    name: "Alaska Paycheck Calculator",
    description: "Take-home pay after federal tax & FICA in Alaska.",
    navCategory: "Paycheck Calculators",
    shellCategory: "Finance",
    icon: <CalculateIcon fontSize="large" color="primary"/>,
    seoTitle: "Alaska Paycheck Calculator - Take-Home Pay",
    seoDescription: "Free Alaska paycheck calculator. Alaska has no state income tax — see net pay after federal tax, Social Security, and Medicare.",
    keywords: ["alaska paycheck calculator", "alaska salary calculator", "alaska take home pay", "alaska tax calculator", "net pay calculator alaska"],
    ogTitle: "Alaska Paycheck Calculator - Take-Home Pay | ToolZoneX",
    ogDescription: "Free Alaska paycheck calculator. Alaska has no state income tax — see net pay after federal tax, Social Security, and Medicare.",
    schemaName: "Alaska Paycheck Calculator",
    schemaDescription: "Estimate take-home pay in Alaska after federal tax, Social Security, and Medicare.",
    applicationCategory: "FinanceApplication",
    currency: "USD",
    faqs: undefined,
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
