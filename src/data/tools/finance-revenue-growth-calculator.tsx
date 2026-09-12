import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/revenue-growth-calculator",
    navName: "Revenue Growth Calculator",
    navDescription: "Period-over-period revenue growth %.",
    name: "Revenue Growth Calculator",
    description: "Add consecutive periods' revenue to calculate period-over-period revenue growth percentage and see the trend across periods.",
    navCategory: "Finance",
    shellCategory: "Finance",
    icon: <TrendingUpIcon fontSize="large" color="primary"/>,
    seoTitle: "Revenue Growth Calculator - Period-over-Period Growth %",
    seoDescription: "Free revenue growth calculator. Add consecutive periods' revenue to find period-over-period growth percentage and trend.",
    keywords: ["revenue growth calculator", "revenue growth rate calculator", "period over period growth calculator", "yoy revenue growth calculator", "how to calculate revenue growth"],
    ogTitle: "Revenue Growth Calculator - Period-over-Period Growth % | ToolZoneX",
    ogDescription: "Calculate period-over-period revenue growth percentage across multiple periods.",
    schemaName: "Revenue Growth Calculator",
    schemaDescription: "Calculate period-over-period revenue growth percentage from consecutive periods' revenue.",
    applicationCategory: "FinanceApplication",
    currency: "USD",
    faqs: [{ question: "What's considered good revenue growth?", answer: "It varies enormously by company stage and industry — early-stage startups often target 10-20% month-over-month growth, while mature public companies may see healthy growth in the single digits annually. Compare against your own historical trend and industry peers rather than a universal benchmark." }, { question: "Should I compare the same period year-over-year instead of sequentially?", answer: "For businesses with seasonal revenue, comparing the same period a year apart (e.g., this Q4 versus last Q4) often gives a clearer growth signal than comparing sequential quarters, which can be skewed by seasonal swings. Enter matching periods from each year as your rows if that fits your business better." }, { question: "What if a period has zero or negative revenue?", answer: "Growth percentage is undefined when the previous period's revenue is zero, since you can't divide by zero — that row will show no growth figure. Negative revenue isn't typical for a revenue line but the formula still works directionally if entered." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
