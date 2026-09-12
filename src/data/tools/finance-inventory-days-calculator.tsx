import Inventory2Icon from '@mui/icons-material/Inventory2';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/inventory-days-calculator",
    navName: "Inventory Days Calculator",
    navDescription: "Days Inventory Outstanding & turnover ratio.",
    name: "Inventory Days Calculator",
    description: "Calculate Days Inventory Outstanding (DIO) and inventory turnover ratio from average inventory value and cost of goods sold.",
    navCategory: "Finance",
    shellCategory: "Finance",
    icon: <Inventory2Icon fontSize="large" color="primary"/>,
    seoTitle: "Inventory Days Calculator - Days Inventory Outstanding (DIO)",
    seoDescription: "Free inventory days calculator. Enter average inventory value and cost of goods sold to calculate Days Inventory Outstanding (DIO) and inventory turnover ratio.",
    keywords: ["inventory days calculator", "days inventory outstanding calculator", "dio calculator", "inventory turnover calculator", "average inventory days calculator"],
    ogTitle: "Inventory Days Calculator - DIO & Turnover | ToolZoneX",
    ogDescription: "Calculate Days Inventory Outstanding and inventory turnover ratio.",
    schemaName: "Inventory Days Calculator",
    schemaDescription: "Calculate Days Inventory Outstanding (DIO) and inventory turnover ratio from average inventory value and cost of goods sold.",
    applicationCategory: "FinanceApplication",
    currency: "USD",
    faqs: [{ question: "Is a lower or higher DIO better?", answer: "Generally, a lower DIO is better — it means inventory converts to sales faster, tying up less cash. However, an extremely low DIO can also signal understocking and lost sales from stockouts, so it's best interpreted against industry norms and the company's own history." }, { question: "How is DIO related to inventory turnover?", answer: "They're inverses of the same idea expressed on different scales: turnover ratio = COGS ÷ average inventory (times per year), while DIO = 365 ÷ turnover ratio (days per cycle). A turnover of 8x per year corresponds to a DIO of about 45.6 days." }, { question: "Why use average inventory instead of ending inventory?", answer: "Average inventory (typically beginning plus ending balance divided by two) smooths out seasonal swings and point-in-time snapshots, giving a more representative figure for the period than a single ending balance that might be unusually high or low." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
