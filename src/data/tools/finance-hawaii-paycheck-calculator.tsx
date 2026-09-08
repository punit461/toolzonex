import CalculateIcon from '@mui/icons-material/Calculate';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/hawaii-paycheck-calculator",
    navName: "Hawaii Paycheck Calculator",
    navDescription: "Take-home pay after federal tax & FICA in Hawaii.",
    name: "Hawaii Paycheck Calculator",
    description: "Take-home pay after federal tax & FICA in Hawaii.",
    navCategory: "Paycheck Calculators",
    shellCategory: "Finance",
    icon: <CalculateIcon fontSize="large" color="primary"/>,
    seoTitle: "Hawaii Paycheck Calculator - Estimate Your Take-Home Pay",
    seoDescription: "Free Hawaii paycheck calculator with 2025 state tax brackets. See net pay after federal tax, Hawaii state tax, Social Security, and Medicare.",
    keywords: ["hawaii paycheck calculator", "hawaii salary calculator", "hawaii take home pay", "hawaii tax calculator", "net pay calculator hawaii"],
    ogTitle: "Hawaii Paycheck Calculator - Estimate Your Take-Home Pay | ToolZoneX",
    ogDescription: "Free Hawaii paycheck calculator with 2025 federal tax brackets and Hawaii state tax.",
    schemaName: "Hawaii Paycheck Calculator",
    schemaDescription: "Estimate take-home pay in Hawaii after federal tax, state tax, Social Security, and Medicare.",
    applicationCategory: "FinanceApplication",
    currency: "USD",
    faqs: undefined,
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
