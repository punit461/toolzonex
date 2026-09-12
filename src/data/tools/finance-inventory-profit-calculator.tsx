import InventoryIcon from '@mui/icons-material/Inventory';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/inventory-profit-calculator",
    navName: "Inventory Profit Calculator",
    navDescription: "Profit from sold inventory items.",
    name: "Inventory Profit Calculator",
    description: "Add sold inventory items with cost, selling price, and quantity sold to calculate per-item and total profit and margin percentage.",
    navCategory: "Finance",
    shellCategory: "Finance",
    icon: <InventoryIcon fontSize="large" color="primary"/>,
    seoTitle: "Inventory Profit Calculator - Profit From Sold Items",
    seoDescription: "Free inventory profit calculator. Add sold items with cost, selling price, and quantity to calculate total profit and margin percentage.",
    keywords: ["inventory profit calculator", "profit margin calculator inventory", "product profit calculator", "how to calculate inventory profit", "sold items profit calculator"],
    ogTitle: "Inventory Profit Calculator - Profit From Sold Items | ToolZoneX",
    ogDescription: "Add sold items with cost, selling price, and quantity to calculate total profit.",
    schemaName: "Inventory Profit Calculator",
    schemaDescription: "Add sold inventory items with cost, selling price, and quantity sold to calculate per-item and total profit and margin percentage.",
    applicationCategory: "FinanceApplication",
    currency: "USD",
    faqs: [{ question: "How is this different from the Inventory Value Calculator?", answer: "The Inventory Value Calculator computes the total VALUE of inventory currently sitting on hand (quantity on hand × unit cost) — it doesn't involve any sales at all. This Inventory Profit Calculator instead computes actual PROFIT from items that have already been SOLD, using selling price minus cost, multiplied by quantity sold — a completely different calculation about revenue and margin rather than stock value." }, { question: "Does this account for other business expenses?", answer: "No — this calculates gross profit from the difference between selling price and unit cost only. It doesn't subtract overhead, shipping, marketing, or other operating expenses, which would need to be factored in separately for net profit." }, { question: "Can margin percentage be negative?", answer: "Yes — if an item's cost is higher than its selling price, both the profit and margin percentage will show as negative, indicating that item is being sold at a loss." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
