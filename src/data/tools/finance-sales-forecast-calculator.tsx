import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/sales-forecast-calculator",
    navName: "Sales Forecast Calculator",
    navDescription: "Project future sales from a growth rate.",
    name: "Sales Forecast Calculator",
    description: "Forecast future sales across multiple periods by compounding a growth rate onto current sales.",
    navCategory: "Finance",
    shellCategory: "Finance",
    icon: <AutoGraphIcon fontSize="large" color="primary"/>,
    seoTitle: "Sales Forecast Calculator - Project Future Revenue",
    seoDescription: "Free sales forecast calculator. Enter current sales and an expected growth rate to project sales across future periods.",
    keywords: ["sales forecast calculator", "revenue forecast calculator", "sales projection calculator", "sales growth forecast", "forecast sales calculator"],
    ogTitle: "Sales Forecast Calculator - Project Future Revenue | ToolZoneX",
    ogDescription: "Forecast future sales across multiple periods by compounding an expected growth rate.",
    schemaName: "Sales Forecast Calculator",
    schemaDescription: "Forecast future sales across multiple periods by compounding a growth rate onto current sales.",
    applicationCategory: "FinanceApplication",
    currency: "USD",
    faqs: [{ question: "Does this assume growth stays constant every period?", answer: "Yes — this is a simple compounding model that applies the same growth rate to every future period. Real sales growth fluctuates with seasonality, market conditions, and competition, so treat this as a baseline scenario rather than a guarantee." }, { question: "What period length should I use?", answer: "Whatever fits your planning horizon — months, quarters, or years all work, as long as the growth rate you enter matches that same period length." }, { question: "Can I model a declining forecast?", answer: "Yes — enter a negative growth rate to project a decline instead of growth; the same compounding formula applies in either direction." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
