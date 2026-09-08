import Inventory2Icon from '@mui/icons-material/Inventory2';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/inventory-value-calculator",
    navName: "Inventory Value Calculator",
    navDescription: "Total inventory value from quantity & unit cost.",
    name: "Inventory Value Calculator",
    description: "Add inventory items with quantity and unit cost to calculate total inventory value.",
    navCategory: "Finance",
    shellCategory: "Finance",
    icon: <Inventory2Icon fontSize="large" color="primary"/>,
    seoTitle: "Inventory Value Calculator - Total Stock Value",
    seoDescription: "Free inventory value calculator. Add items with quantity and unit cost to calculate total inventory value.",
    keywords: ["inventory value calculator", "total inventory value calculator", "stock value calculator", "inventory worth calculator", "how to calculate inventory value"],
    ogTitle: "Inventory Value Calculator - Total Stock Value | ToolZoneX",
    ogDescription: "Add inventory items with quantity and unit cost to calculate total inventory value.",
    schemaName: "Inventory Value Calculator",
    schemaDescription: "Calculate total inventory value by multiplying quantity by unit cost for each item and summing all items.",
    applicationCategory: "FinanceApplication",
    currency: "USD",
    faqs: [{ question: "Is this FIFO, LIFO, or another costing method?", answer: "No — this is a simple total-value calculation (current quantity × current unit cost, summed across items). FIFO and LIFO are costing-layer methods that require the full history of purchase transactions at different cost points over time, not just a current quantity and cost snapshot, so they aren't something this simple tool can replicate." }, { question: "What unit cost should I use?", answer: "Use whatever cost basis matches your purpose — the most recent purchase price for a rough current-value estimate, or your average cost per unit if you track that. For formal accounting purposes, follow your business's chosen inventory costing method." }, { question: "Can I use this for a large number of items?", answer: "Yes — add as many rows as you need. For very large inventories, a spreadsheet or inventory management system may be more practical, but this works well for a quick check on a smaller list." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
