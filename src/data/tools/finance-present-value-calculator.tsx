import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/present-value-calculator",
    navName: "Present Value Calculator",
    navDescription: "Find what a future sum is worth today.",
    name: "Present Value Calculator",
    description: "Calculate the present value of a future sum of money using the time value of money. See year-by-year discounting with any discount rate.",
    navCategory: "Finance",
    shellCategory: "Finance",
    icon: <TrendingUpIcon fontSize="large" color="primary"/>,
    seoTitle: "Present Value Calculator - Time Value of Money",
    seoDescription: "Free present value calculator to find what a future sum is worth today. Includes year-by-year discounting table.",
    keywords: ["present value calculator", "pv calculator", "time value of money calculator", "discount calculator", "future value to present value"],
    ogTitle: "Present Value Calculator - Time Value of Money | ToolZoneX",
    ogDescription: "Calculate the present value of a future sum using the time value of money.",
    schemaName: "Present Value Calculator",
    schemaDescription: "Calculate the present value of a future sum using the time value of money.",
    applicationCategory: "FinanceApplication",
    currency: "USD",
    faqs: [{ question: "What discount rate should I use?", answer: "Use your required rate of return or opportunity cost of capital. A higher discount rate results in a lower present value." }, { question: "What is the relationship between PV and interest rates?", answer: "Present value is inversely related to the discount rate. As rates rise, present value of future money falls." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
