import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/accounts-receivable-days-calculator",
    navName: "Accounts Receivable Days Calculator",
    navDescription: "DSO — days to collect payment after a sale.",
    name: "Accounts Receivable Days Calculator (DSO)",
    description: "Calculate Days Sales Outstanding (DSO) from accounts receivable, total credit sales, and period length to measure how quickly a business collects payment.",
    navCategory: "Finance",
    shellCategory: "Finance",
    icon: <RequestQuoteIcon fontSize="large" color="primary"/>,
    seoTitle: "Accounts Receivable Days Calculator - DSO Formula",
    seoDescription: "Free accounts receivable days (DSO) calculator. Enter accounts receivable, credit sales, and period days to calculate Days Sales Outstanding.",
    keywords: ["accounts receivable days calculator", "dso calculator", "days sales outstanding calculator", "dso formula", "average collection period calculator"],
    ogTitle: "Accounts Receivable Days Calculator - DSO Formula | ToolZoneX",
    ogDescription: "Calculate Days Sales Outstanding (DSO) from accounts receivable and credit sales.",
    schemaName: "Accounts Receivable Days Calculator",
    schemaDescription: "Calculate Days Sales Outstanding (DSO) as accounts receivable divided by total credit sales, multiplied by the number of days in the period.",
    applicationCategory: "FinanceApplication",
    currency: "USD",
    faqs: [{ question: "What's a good DSO?", answer: "It depends heavily on your industry and standard payment terms, but a DSO close to or below your stated payment terms (e.g., 30-45 days for net-30 or net-45 terms) is generally considered healthy. A DSO significantly higher than your terms suggests collection problems." }, { question: "Should I use total sales or only credit sales?", answer: "Use only credit sales — cash sales are collected immediately and shouldn't be included, since DSO specifically measures the collection cycle for sales made on credit." }, { question: "How does DSO relate to the Accounts Payable Days Calculator?", answer: "DSO measures how fast you collect from customers, while Days Payable Outstanding (DPO) measures how long you take to pay your own suppliers. Comparing the two together shows your overall cash conversion timing — see the Accounts Payable Days Calculator for the DPO side." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
