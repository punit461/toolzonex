import LoyaltyIcon from '@mui/icons-material/Loyalty';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/customer-retention-rate-calculator",
    navName: "Customer Retention Rate Calculator",
    navDescription: "Percentage of customers retained over a period.",
    name: "Customer Retention Rate Calculator",
    description: "Calculate customer retention rate from customers at the start and end of a period and new customers acquired.",
    navCategory: "Finance",
    shellCategory: "Finance",
    icon: <LoyaltyIcon fontSize="large" color="primary"/>,
    seoTitle: "Customer Retention Rate Calculator - CRR Formula",
    seoDescription: "Free customer retention rate calculator. Enter starting customers, ending customers, and new customers to calculate CRR.",
    keywords: ["customer retention rate calculator", "crr calculator", "customer retention formula", "retention rate calculator", "customer churn vs retention"],
    ogTitle: "Customer Retention Rate Calculator - CRR Formula | ToolZoneX",
    ogDescription: "Calculate customer retention rate from starting customers, ending customers, and new customers.",
    schemaName: "Customer Retention Rate Calculator",
    schemaDescription: "Calculate customer retention rate from customers at the start and end of a period and new customers acquired.",
    applicationCategory: "FinanceApplication",
    currency: "USD",
    faqs: [{ question: "What does a negative or over-100% result mean?", answer: "Both signal a data-entry issue — in a valid scenario, ending customers minus new customers should never exceed your starting customer count. Double-check that your start, end, and new customer figures are all measured over the exact same period." }, { question: "What counts as a \"good\" retention rate?", answer: "It varies heavily by industry — subscription software businesses often aim for 90%+ monthly retention, while other industries with naturally higher churn may consider 70-80% healthy. Compare against your own historical trend rather than a universal benchmark." }, { question: "How is this different from churn rate?", answer: "Churn rate and retention rate are complementary — churn rate measures the percentage of customers lost, while retention rate measures the percentage kept. Retention rate = 100% − churn rate when both are measured the same way." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
