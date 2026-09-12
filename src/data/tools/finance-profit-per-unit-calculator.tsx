import Inventory2Icon from '@mui/icons-material/Inventory2';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/profit-per-unit-calculator",
    navName: "Profit Per Unit Calculator",
    navDescription: "Profit and margin for a single product.",
    name: "Profit Per Unit Calculator",
    description: "Calculate profit per unit and total profit from a product's selling price, cost per unit, and units sold — for per-product profitability analysis.",
    navCategory: "Finance",
    shellCategory: "Finance",
    icon: <Inventory2Icon fontSize="large" color="primary"/>,
    seoTitle: "Profit Per Unit Calculator - Per-Product Profit & Margin",
    seoDescription: "Free profit per unit calculator. Enter selling price, cost per unit, and units sold to calculate profit per unit, total profit, and margin percentage.",
    keywords: ["profit per unit calculator", "per unit profit calculator", "product profit calculator", "profit margin per item", "unit profit margin"],
    ogTitle: "Profit Per Unit Calculator - Per-Product Profit & Margin | ToolZoneX",
    ogDescription: "Calculate profit per unit and total profit from selling price, cost per unit, and units sold.",
    schemaName: "Profit Per Unit Calculator",
    schemaDescription: "Calculate profit per unit and total profit from a product's selling price, cost per unit, and units sold.",
    applicationCategory: "FinanceApplication",
    currency: "USD",
    faqs: [{ question: "How is this different from a gross profit calculator?", answer: "A gross profit calculator typically works at the whole-business level — total revenue minus total cost of goods sold. This tool works at the individual product level, showing profit for one unit and one product line, which is more useful when comparing multiple products against each other." }, { question: "What should I include in cost per unit?", answer: "Include everything directly tied to producing or acquiring that one unit — materials, manufacturing or wholesale cost, and per-unit packaging or shipping. Shared overhead like rent or salaries is usually better handled separately at the business level rather than allocated per unit." }, { question: "Can profit per unit be negative?", answer: "Yes — if your cost per unit exceeds your selling price, you're losing money on every sale of that product, which is an important signal to raise prices, cut costs, or discontinue the product line." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
