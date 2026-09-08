import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/loan-affordability-calculator",
    navName: "Loan Affordability Calculator",
    navDescription: "Max loan amount from income & target DTI.",
    name: "Loan Affordability Calculator",
    description: "Calculate the maximum affordable loan amount from monthly income, existing debts, loan term, interest rate, and a target debt-to-income ratio.",
    navCategory: "Finance",
    shellCategory: "Finance",
    icon: <RequestQuoteIcon fontSize="large" color="primary"/>,
    seoTitle: "Loan Affordability Calculator - Max Loan Amount Calculator",
    seoDescription: "Free loan affordability calculator. Enter income, existing debts, term, rate, and target DTI to find the maximum loan amount you can afford.",
    keywords: ["loan affordability calculator", "max loan amount calculator", "debt to income loan calculator", "how much loan can i afford", "loan eligibility calculator"],
    ogTitle: "Loan Affordability Calculator - Max Loan Amount Calculator | ToolZoneX",
    ogDescription: "Calculate the maximum loan amount you can afford based on income and target DTI.",
    schemaName: "Loan Affordability Calculator",
    schemaDescription: "Calculate the maximum affordable loan amount from monthly income, existing debts, loan term, interest rate, and target debt-to-income ratio.",
    applicationCategory: "FinanceApplication",
    currency: "USD",
    faqs: [{ question: "What DTI ratio do lenders typically use?", answer: "Many lenders cap total DTI (including the new loan) around 36-43%, though this varies by loan type and lender. Mortgage lenders often use the 28/36 rule, while personal loan and auto lenders may allow different thresholds." }, { question: "Why do my existing debts reduce the loan amount so much?", answer: "The target DTI caps your total monthly debt obligations, not just the new loan. Every dollar already committed to other debts is a dollar less available for a new loan payment, which is why paying down existing debt can meaningfully raise how much you can borrow." }, { question: "Does this include taxes, insurance, or fees?", answer: "No — this estimates borrowing capacity based on principal and interest only. Loan origination fees, insurance requirements, or other add-on costs specific to your lender aren't included and could affect the actual amount you qualify for." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
