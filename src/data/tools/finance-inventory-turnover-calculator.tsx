import Inventory2Icon from '@mui/icons-material/Inventory2';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/inventory-turnover-calculator",
    navName: "Inventory Turnover Calculator",
    navDescription: "Turnover ratio & days inventory outstanding.",
    name: "Inventory Turnover Calculator",
    description: "Calculate inventory turnover ratio and days inventory outstanding from cost of goods sold and average inventory value.",
    navCategory: "Finance",
    shellCategory: "Finance",
    icon: <Inventory2Icon fontSize="large" color="primary"/>,
    seoTitle: "Inventory Turnover Calculator - Turnover Ratio & DIO",
    seoDescription: "Free inventory turnover calculator. Enter COGS and average inventory value to calculate turnover ratio and days inventory outstanding.",
    keywords: ["inventory turnover calculator", "inventory turnover ratio", "days inventory outstanding calculator", "stock turnover calculator", "cogs to inventory ratio"],
    ogTitle: "Inventory Turnover Calculator - Turnover Ratio & DIO | ToolZoneX",
    ogDescription: "Calculate inventory turnover ratio and days inventory outstanding from COGS and average inventory value.",
    schemaName: "Inventory Turnover Calculator",
    schemaDescription: "Calculate inventory turnover ratio (COGS divided by average inventory) and days inventory outstanding.",
    applicationCategory: "FinanceApplication",
    currency: "USD",
    faqs: [{ question: "What does a low turnover ratio mean?", answer: "A low ratio can indicate overstocking, weak sales, or obsolete inventory tying up cash that could be used elsewhere. However, some industries (like capital equipment) normally run low ratios, so context matters." }, { question: "What does a very high turnover ratio mean?", answer: "A very high ratio can mean strong sales and efficient inventory management, but an unusually high ratio can also signal insufficient stock levels, leading to missed sales from stockouts." }, { question: "Should I use annual or a different period for COGS?", answer: "You can use any period (monthly, quarterly, or annual) as long as the COGS figure and the average inventory figure cover the same timeframe — mixing periods will distort the ratio." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
