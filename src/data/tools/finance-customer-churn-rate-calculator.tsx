import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/customer-churn-rate-calculator",
    navName: "Customer Churn Rate Calculator",
    navDescription: "Percentage of customers lost over a period.",
    name: "Customer Churn Rate Calculator",
    description: "Calculate customer churn rate from customers at the start of a period and customers lost during that period.",
    navCategory: "Finance",
    shellCategory: "Finance",
    icon: <TrendingDownIcon fontSize="large" color="primary"/>,
    seoTitle: "Customer Churn Rate Calculator - Churn Formula",
    seoDescription: "Free customer churn rate calculator. Enter customers at the start of a period and customers lost to calculate churn rate.",
    keywords: ["customer churn rate calculator", "churn rate calculator", "customer churn formula", "churn calculator", "customer retention vs churn"],
    ogTitle: "Customer Churn Rate Calculator - Churn Formula | ToolZoneX",
    ogDescription: "Calculate customer churn rate from starting customers and customers lost during a period.",
    schemaName: "Customer Churn Rate Calculator",
    schemaDescription: "Calculate customer churn rate as customers lost divided by customers at the start of the period, times 100.",
    applicationCategory: "FinanceApplication",
    currency: "USD",
    faqs: [{ question: "How is this different from the Customer Retention Rate Calculator?", answer: "Churn and retention describe complementary aspects of the same customer loss — but this tool frames the calculation directly around losses (useful for churn-focused reporting), while the Retention Rate Calculator instead uses starting, ending, and new-customer counts to measure how many original customers were kept. Retention rate = 100% − churn rate when both are measured over the same period the same way." }, { question: "What's considered a \"good\" churn rate?", answer: "It varies by industry — subscription software businesses often aim for under 5-10% annual churn, while other industries with naturally higher turnover may tolerate more. Compare against your own historical trend rather than a single universal benchmark." }, { question: "Does this account for new customers gained during the period?", answer: "No — this calculator measures losses only, relative to the customers you started with. If you also want to factor in new customers acquired, use the Customer Retention Rate Calculator instead." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
