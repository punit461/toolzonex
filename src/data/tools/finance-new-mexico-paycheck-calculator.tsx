import CalculateIcon from '@mui/icons-material/Calculate';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/new-mexico-paycheck-calculator",
    navName: "New Mexico Paycheck Calculator",
    navDescription: "Take-home pay after federal tax & FICA in New Mexico.",
    name: "New Mexico Paycheck Calculator",
    description: "Take-home pay after federal tax & FICA in New Mexico.",
    navCategory: "Paycheck Calculators",
    shellCategory: "Finance",
    icon: <CalculateIcon fontSize="large" color="primary"/>,
    seoTitle: "New Mexico Paycheck Calculator - Estimate Your Take-Home Pay",
    seoDescription: "Free New Mexico paycheck calculator with 2025 state tax brackets. See net pay after federal tax, New Mexico state tax, Social Security, and Medicare.",
    keywords: ["new mexico paycheck calculator", "new mexico salary calculator", "new mexico take home pay", "new mexico tax calculator", "net pay calculator new mexico"],
    ogTitle: "New Mexico Paycheck Calculator - Estimate Your Take-Home Pay | ToolZoneX",
    ogDescription: "Free New Mexico paycheck calculator with 2025 federal tax brackets and New Mexico state tax.",
    schemaName: "New Mexico Paycheck Calculator",
    schemaDescription: "Estimate take-home pay in New Mexico after federal tax, state tax, Social Security, and Medicare.",
    applicationCategory: "FinanceApplication",
    currency: "USD",
    faqs: undefined,
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
