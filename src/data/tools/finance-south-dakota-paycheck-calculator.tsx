import CalculateIcon from '@mui/icons-material/Calculate';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/south-dakota-paycheck-calculator",
    navName: "South Dakota Paycheck Calculator",
    navDescription: "Take-home pay after federal tax & FICA in South Dakota.",
    name: "South Dakota Paycheck Calculator",
    description: "Take-home pay after federal tax & FICA in South Dakota.",
    navCategory: "Paycheck Calculators",
    shellCategory: "Finance",
    icon: <CalculateIcon fontSize="large" color="primary"/>,
    seoTitle: "South Dakota Paycheck Calculator - Take-Home Pay",
    seoDescription: "Free South Dakota paycheck calculator. South Dakota has no state income tax — see net pay after federal tax, Social Security, and Medicare.",
    keywords: ["south dakota paycheck calculator", "south dakota salary calculator", "south dakota take home pay", "south dakota tax calculator", "net pay calculator south dakota"],
    ogTitle: "South Dakota Paycheck Calculator - Take-Home Pay | ToolZoneX",
    ogDescription: "Free South Dakota paycheck calculator. South Dakota has no state income tax — see net pay after federal tax, Social Security, and Medicare.",
    schemaName: "South Dakota Paycheck Calculator",
    schemaDescription: "Estimate take-home pay in South Dakota after federal tax, Social Security, and Medicare.",
    applicationCategory: "FinanceApplication",
    currency: "USD",
    faqs: undefined,
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
