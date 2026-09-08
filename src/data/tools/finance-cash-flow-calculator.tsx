import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/cash-flow-calculator",
    navName: "Cash Flow Calculator",
    navDescription: "Net cash flow from inflows & outflows.",
    name: "Cash Flow Calculator",
    description: "Calculate net cash flow from a customizable list of cash inflows and cash outflows.",
    navCategory: "Finance",
    shellCategory: "Finance",
    icon: <CompareArrowsIcon fontSize="large" color="primary"/>,
    seoTitle: "Cash Flow Calculator - Net Cash Flow Calculator",
    seoDescription: "Free cash flow calculator. List your cash inflows and outflows to calculate total inflows, total outflows, and net cash flow.",
    keywords: ["cash flow calculator", "net cash flow calculator", "cash flow statement calculator", "inflow outflow calculator", "personal cash flow calculator"],
    ogTitle: "Cash Flow Calculator - Net Cash Flow Calculator | ToolZoneX",
    ogDescription: "Calculate net cash flow from a list of cash inflows and outflows.",
    schemaName: "Cash Flow Calculator",
    schemaDescription: "Calculate net cash flow from a customizable list of cash inflows and cash outflows.",
    applicationCategory: "FinanceApplication",
    currency: "USD",
    faqs: [{ question: "Is net cash flow the same as profit?", answer: "Not exactly. Profit is based on accounting revenue and expenses, which can include non-cash items like depreciation, while cash flow only tracks actual money moving in and out. A business can be profitable on paper but still have poor cash flow, and vice versa." }, { question: "What should I do if my cash flow is negative?", answer: "Review the outflow list for expenses that can be reduced or delayed, and check whether any inflows are one-time versus recurring. Persistent negative cash flow means you're drawing down savings or debt to cover the shortfall." }, { question: "Should I include one-time items?", answer: "You can, but it's often more useful to calculate recurring cash flow separately from one-time inflows or outflows (like a bonus or a large purchase) so you can see your ongoing, sustainable cash position clearly." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
