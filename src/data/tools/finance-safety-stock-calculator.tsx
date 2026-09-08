import Inventory2Icon from '@mui/icons-material/Inventory2';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/safety-stock-calculator",
    navName: "Safety Stock Calculator",
    navDescription: "Calculate buffer inventory needed.",
    name: "Safety Stock Calculator",
    description: "Calculate the buffer inventory needed to protect against demand spikes and lead-time delays, using the standard safety stock formula.",
    navCategory: "Finance",
    shellCategory: "Finance",
    icon: <Inventory2Icon fontSize="large" color="primary"/>,
    seoTitle: "Safety Stock Calculator - Calculate Buffer Inventory",
    seoDescription: "Free safety stock calculator. Enter max/average daily usage and lead time to calculate the buffer inventory needed to avoid stockouts.",
    keywords: ["safety stock calculator", "buffer stock calculator", "inventory safety stock formula", "reorder point calculator", "safety stock formula"],
    ogTitle: "Safety Stock Calculator - Calculate Buffer Inventory | ToolZoneX",
    ogDescription: "Calculate the buffer inventory needed to protect against demand spikes and lead-time delays.",
    schemaName: "Safety Stock Calculator",
    schemaDescription: "Calculate the buffer inventory needed to protect against demand spikes and lead-time delays, using the standard safety stock formula.",
    applicationCategory: "FinanceApplication",
    currency: "INR",
    faqs: [{ question: "How is safety stock different from the Economic Order Quantity (EOQ)?", answer: "EOQ answers \"how much should I order each time?\" to minimize total ordering and holding costs. Safety stock answers a different question — \"how much extra buffer should I hold?\" to protect against demand spikes and lead-time delays. Use our separate EOQ calculator to size your regular order quantity, and this tool to size your buffer on top of it." }, { question: "What if my safety stock comes out negative?", answer: "A negative result means your maximum daily usage and lead time aren't much higher than your averages, implying little variability to buffer against. In practice, most businesses still hold at least a small buffer, so treat a negative or near-zero result as a signal that minimal safety stock is needed, rather than literally holding negative inventory." }, { question: "Where do I get my \"maximum\" usage and lead time figures?", answer: "Look back at your historical sales and supplier delivery data over a recent period (such as the last 6-12 months) and use the highest daily usage and longest lead time observed, alongside the averages over that same period, for a realistic buffer calculation." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
