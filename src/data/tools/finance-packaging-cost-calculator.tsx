import Inventory2Icon from '@mui/icons-material/Inventory2';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/packaging-cost-calculator",
    navName: "Packaging Cost Calculator",
    navDescription: "Packaging cost per unit and per order.",
    name: "Packaging Cost Calculator",
    description: "Add packaging materials, labor, and shipping costs per unit to calculate total packaging cost per unit and per order.",
    navCategory: "Finance",
    shellCategory: "Finance",
    icon: <Inventory2Icon fontSize="large" color="primary"/>,
    seoTitle: "Packaging Cost Calculator - Cost per Unit & per Order",
    seoDescription: "Free packaging cost calculator. Add materials, labor, and shipping costs per unit to find total packaging cost per unit and per order.",
    keywords: ["packaging cost calculator", "cost of packaging per unit calculator", "shipping and packaging cost calculator", "packaging cost per order calculator", "product packaging cost estimator"],
    ogTitle: "Packaging Cost Calculator - Cost per Unit & per Order | ToolZoneX",
    ogDescription: "Calculate total packaging cost per unit and per order from materials, labor, and shipping.",
    schemaName: "Packaging Cost Calculator",
    schemaDescription: "Calculate total packaging cost per unit and per order from materials, labor/handling, and shipping cost.",
    applicationCategory: "FinanceApplication",
    currency: "USD",
    faqs: [{ question: "Should shipping cost really count as a \"packaging\" cost?", answer: "It's included here because most businesses care about the total cost to get a packaged product out the door, and shipping is a major, often-overlooked line item in that total. If you only want materials and labor, just leave the shipping field at zero." }, { question: "How do I find my per-unit labor/handling cost?", answer: "Divide your total packing labor cost for a shift or period by the number of units packed in that same period — that gives a rough per-unit labor rate you can refine over time as your process changes." }, { question: "Does this account for bulk discounts on materials?", answer: "No — enter your actual per-unit material costs at your current order volume. If you get a bulk discount at a higher order quantity, update the material cost fields to reflect that lower per-unit price before calculating the batch total." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
