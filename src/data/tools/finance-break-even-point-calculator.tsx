import QueryStatsIcon from '@mui/icons-material/QueryStats';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/break-even-point-calculator",
    navName: "Break-Even Point Calculator",
    navDescription: "Units and revenue to break even.",
    name: "Break-Even Point Calculator",
    description: "Calculate the break-even quantity and break-even revenue from fixed costs, price per unit, and variable cost per unit.",
    navCategory: "Finance",
    shellCategory: "Finance",
    icon: <QueryStatsIcon fontSize="large" color="primary"/>,
    seoTitle: "Break-Even Point Calculator - Units & Revenue to Break Even",
    seoDescription: "Free break-even point calculator. Enter fixed costs, price per unit, and variable cost per unit to find break-even units and revenue.",
    keywords: ["break even point calculator", "break even analysis calculator", "break even units calculator", "contribution margin calculator", "break even revenue"],
    ogTitle: "Break-Even Point Calculator - Units & Revenue to Break Even | ToolZoneX",
    ogDescription: "Calculate break-even units and revenue from fixed costs, price, and variable cost.",
    schemaName: "Break-Even Point Calculator",
    schemaDescription: "Calculate the break-even quantity and break-even revenue from fixed costs, price per unit, and variable cost per unit.",
    applicationCategory: "FinanceApplication",
    currency: "USD",
    faqs: [{ question: "What happens if variable cost is higher than the price?", answer: "If the variable cost per unit equals or exceeds the price, the contribution margin is zero or negative, meaning every unit sold loses money and break-even is mathematically impossible — the price needs to be raised or costs cut." }, { question: "What counts as a fixed cost versus a variable cost?", answer: "Fixed costs stay the same regardless of sales volume, like rent, salaried staff, and insurance. Variable costs scale directly with units sold, like raw materials, packaging, and sales commissions." }, { question: "Does break-even analysis guarantee profitability?", answer: "No — it only tells you the point where profit is zero. Actual profitability depends on hitting or exceeding that sales volume consistently, along with managing costs and demand over time." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
