import InventoryIcon from '@mui/icons-material/Inventory';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/inventory-carrying-cost-calculator",
    navName: "Inventory Carrying Cost Calculator",
    navDescription: "Annual cost of holding inventory.",
    name: "Inventory Carrying Cost Calculator",
    description: "Calculate annual inventory carrying cost from average inventory value and a carrying cost rate made up of storage, insurance, obsolescence, and opportunity cost.",
    navCategory: "Finance",
    shellCategory: "Finance",
    icon: <InventoryIcon fontSize="large" color="primary"/>,
    seoTitle: "Inventory Carrying Cost Calculator - Annual Holding Cost",
    seoDescription: "Free inventory carrying cost calculator. Enter average inventory value and carrying cost rate components to find annual carrying cost.",
    keywords: ["inventory carrying cost calculator", "inventory holding cost calculator", "cost of carrying inventory calculator", "inventory carrying cost formula", "warehouse holding cost calculator"],
    ogTitle: "Inventory Carrying Cost Calculator - Annual Holding Cost | ToolZoneX",
    ogDescription: "Calculate annual inventory carrying cost from average inventory value and carrying cost rate.",
    schemaName: "Inventory Carrying Cost Calculator",
    schemaDescription: "Calculate annual inventory carrying cost from average inventory value and a carrying cost rate percentage.",
    applicationCategory: "FinanceApplication",
    currency: "USD",
    faqs: [{ question: "How is this different from inventory turnover?", answer: "Inventory turnover measures how many times inventory is sold and replaced in a period (COGS ÷ average inventory) — it's a speed metric. Carrying cost instead puts an actual dollar figure on what it costs to hold that inventory each year, regardless of how fast it turns over." }, { question: "What counts as the \"opportunity cost\" component?", answer: "It's the return that capital tied up in inventory could have earned elsewhere — paying down debt, investing in growth, or simply earning interest — instead of sitting on a warehouse shelf. Many businesses estimate this using their cost of capital or a target investment return rate." }, { question: "What's a typical total carrying cost rate?", answer: "20-30% of inventory value per year is a widely used industry rule of thumb, though it varies by industry — perishable or fast-obsolescing goods (like electronics or fashion) often carry higher rates, while stable, non-perishable goods may carry lower rates." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
