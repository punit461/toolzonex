import LoyaltyIcon from '@mui/icons-material/Loyalty';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/customer-lifetime-value-calculator",
    navName: "Customer Lifetime Value Calculator",
    navDescription: "CLV from purchase value, frequency & lifespan.",
    name: "Customer Lifetime Value Calculator",
    description: "Calculate customer lifetime value (CLV) from average purchase value, purchase frequency, and customer lifespan, with an optional acquisition cost deduction.",
    navCategory: "Finance",
    shellCategory: "Finance",
    icon: <LoyaltyIcon fontSize="large" color="primary"/>,
    seoTitle: "Customer Lifetime Value Calculator - CLV Calculator",
    seoDescription: "Free CLV calculator. Enter average purchase value, purchase frequency, and customer lifespan to calculate customer lifetime value and net CLV.",
    keywords: ["customer lifetime value calculator", "clv calculator", "clv formula", "customer value calculator", "clv to cac ratio"],
    ogTitle: "Customer Lifetime Value Calculator - CLV Calculator | ToolZoneX",
    ogDescription: "Calculate customer lifetime value from purchase value, frequency, and lifespan.",
    schemaName: "Customer Lifetime Value Calculator",
    schemaDescription: "Calculate customer lifetime value (CLV) from average purchase value, purchase frequency, and customer lifespan.",
    applicationCategory: "FinanceApplication",
    currency: "USD",
    faqs: [{ question: "What is a healthy CLV to CAC ratio?", answer: "A commonly cited benchmark is a CLV to CAC ratio of at least 3:1, meaning a customer generates three times what it cost to acquire them. Below that, growth can be unprofitable once overhead is included." }, { question: "How do I estimate customer lifespan?", answer: "Divide 1 by your annual customer churn rate. For example, a 25% annual churn rate implies an average customer lifespan of 4 years (1 ÷ 0.25). If you don't track churn yet, a conservative estimate based on historical repeat-purchase data works as a starting point." }, { question: "Should I use gross or net CLV for decisions?", answer: "Net CLV, which subtracts acquisition cost, gives a truer picture of profitability. Gross CLV is still useful for understanding total revenue potential before costs are factored in." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
