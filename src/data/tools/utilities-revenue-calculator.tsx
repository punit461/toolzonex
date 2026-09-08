import ShowChartIcon from '@mui/icons-material/ShowChart';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/revenue-calculator",
    navName: "Revenue Calculator",
    navDescription: "Calculate revenue, discounts & profit.",
    name: "Revenue Calculator",
    description: "Calculate gross and net revenue from units sold and price, with discounts and other income, plus profit and margin when cost per unit is provided.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <ShowChartIcon fontSize="large" color="primary"/>,
    seoTitle: "Revenue Calculator - Gross, Net Revenue & Profit",
    seoDescription: "Free revenue calculator to compute gross and net revenue from units sold and price, including discounts, other income, profit, and margin.",
    keywords: ["revenue calculator", "revenue projection", "sales revenue calculator", "net revenue calculator", "profit calculator", "gross revenue", "margin calculator"],
    ogTitle: "Revenue Calculator - Gross, Net Revenue & Profit | ToolZoneX",
    ogDescription: "Calculate gross and net revenue, discounts, profit, and margin.",
    schemaName: "Revenue Calculator",
    schemaDescription: "Calculate gross and net revenue, discount amount, profit, and margin.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "What is the difference between gross and net revenue?", answer: "Gross revenue is total sales before any deductions. Net revenue subtracts discounts and returns (and here adds other income) to reflect what you realistically collect." }, { question: "How is profit margin calculated?", answer: "Profit margin is profit divided by net revenue, multiplied by 100. It shows what percentage of each revenue dollar is retained after covering the cost of goods sold." }, { question: "Should I use monthly or yearly figures?", answer: "Use whichever matches your planning horizon. The numbers scale identically given the same units, price, and cost — the toggle simply labels the results. Choose monthly for short-term budgeting and yearly for annual forecasts." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
