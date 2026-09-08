import InventoryIcon from '@mui/icons-material/Inventory';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/economic-order-quantity-calculator",
    navName: "EOQ Calculator",
    navDescription: "Optimal order quantity to minimize inventory cost.",
    name: "Economic Order Quantity Calculator",
    description: "Calculate the Economic Order Quantity (EOQ) that minimizes combined ordering and holding costs, from annual demand, ordering cost, and holding cost.",
    navCategory: "Finance",
    shellCategory: "Finance",
    icon: <InventoryIcon fontSize="large" color="primary"/>,
    seoTitle: "Economic Order Quantity (EOQ) Calculator",
    seoDescription: "Free EOQ calculator. Enter annual demand, ordering cost per order, and holding cost per unit to find the economic order quantity and total inventory cost.",
    keywords: ["economic order quantity calculator", "eoq calculator", "optimal order quantity calculator", "inventory ordering calculator", "eoq formula calculator"],
    ogTitle: "Economic Order Quantity Calculator - EOQ | ToolZoneX",
    ogDescription: "Find the order quantity that minimizes combined ordering and holding costs.",
    schemaName: "Economic Order Quantity Calculator",
    schemaDescription: "Calculate the Economic Order Quantity that minimizes combined ordering and holding costs.",
    applicationCategory: "FinanceApplication",
    currency: "USD",
    faqs: [{ question: "What assumptions does the EOQ formula make?", answer: "Classic EOQ assumes constant, known demand, a fixed ordering cost per order, a fixed holding cost per unit, no quantity discounts, and instantaneous replenishment (no lead-time stockouts). Real-world inventory often violates one or more of these, so treat EOQ as a starting point rather than an exact answer." }, { question: "What happens if I order more or less than the EOQ?", answer: "Ordering more than the EOQ increases holding costs faster than it reduces ordering costs (and vice versa for ordering less) — the EOQ is specifically the quantity where those two costs are balanced and their sum is at its minimum." }, { question: "How do I estimate my holding cost per unit?", answer: "A common approach is to take a percentage (often 15-30%) of the unit's purchase cost to account for storage space, insurance, spoilage/obsolescence risk, and the opportunity cost of capital tied up in inventory rather than invested elsewhere." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
