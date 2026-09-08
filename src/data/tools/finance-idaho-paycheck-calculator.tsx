import CalculateIcon from '@mui/icons-material/Calculate';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/idaho-paycheck-calculator",
    navName: "Idaho Paycheck Calculator",
    navDescription: "Take-home pay after federal tax & FICA in Idaho.",
    name: "Idaho Paycheck Calculator",
    description: "Take-home pay after federal tax & FICA in Idaho.",
    navCategory: "Paycheck Calculators",
    shellCategory: "Finance",
    icon: <CalculateIcon fontSize="large" color="primary"/>,
    seoTitle: "Idaho Paycheck Calculator - Estimate Your Take-Home Pay",
    seoDescription: "Free Idaho paycheck calculator with the 2025 flat 5.3% state tax rate. See net pay after federal tax, Idaho state tax, Social Security, and Medicare.",
    keywords: ["idaho paycheck calculator", "idaho salary calculator", "idaho take home pay", "idaho tax calculator", "net pay calculator idaho"],
    ogTitle: "Idaho Paycheck Calculator - Estimate Your Take-Home Pay | ToolZoneX",
    ogDescription: "Free Idaho paycheck calculator with 2025 federal tax brackets and Idaho's flat 5.3% state tax.",
    schemaName: "Idaho Paycheck Calculator",
    schemaDescription: "Estimate take-home pay in Idaho after federal tax, state tax, Social Security, and Medicare.",
    applicationCategory: "FinanceApplication",
    currency: "USD",
    faqs: undefined,
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
