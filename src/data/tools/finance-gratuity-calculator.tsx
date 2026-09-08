import ReceiptIcon from '@mui/icons-material/Receipt';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/gratuity-calculator",
    navName: "Gratuity Calculator",
    navDescription: "Calculate your end-of-service gratuity amount.",
    name: "Online Gratuity Calculator",
    description: "Calculate how much gratuity you are entitled to receive from your employer after 5 years of service.",
    navCategory: "Finance",
    shellCategory: "Finance",
    icon: <ReceiptIcon fontSize="large" color="primary"/>,
    seoTitle: "Gratuity Calculator - Calculate Gratuity Amount",
    seoDescription: "Free gratuity calculator to calculate your end-of-service gratuity amount. Understand your employee benefits with this accurate calculator.",
    keywords: ["gratuity calculator", "gratuity amount", "end of service gratuity", "employee benefits", "gratuity act", "service gratuity", "what is gratuity in india", "payment of gratuity act 1972", "gratuity eligibility"],
    ogTitle: "Gratuity Calculator - Calculate Gratuity Amount | ToolZoneX",
    ogDescription: "Calculate your gratuity amount as an employee.",
    schemaName: "Gratuity Calculator",
    schemaDescription: "Calculate gratuity amount for employees.",
    applicationCategory: "FinanceApplication",
    currency: "INR",
    faqs: [{ question: "What is gratuity in India?", answer: "Gratuity is a lump-sum payment an employer makes to an employee as a reward for continuous, long-term service, governed in India by the Payment of Gratuity Act, 1972. It's paid out on resignation, retirement, superannuation, or death/disablement, and is separate from your regular salary or provident fund." }, { question: "Who is eligible for gratuity in India?", answer: "An employee is generally eligible for gratuity after completing at least 5 continuous years of service with the same employer, calculated using the formula (15 × Last Drawn Salary × Years of Service) / 26. The 5-year requirement is waived in cases of death or disablement." }, { question: "Is gratuity taxable?", answer: "For government employees, gratuity is fully tax-exempt. For private-sector employees covered under the Payment of Gratuity Act, exemption is available up to ₹20 lakh; amounts above that are taxable." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
