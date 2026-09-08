import HomeIcon from '@mui/icons-material/Home';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/loan-to-value-calculator",
    navName: "Loan to Value (LTV) Calculator",
    navDescription: "LTV ratio from loan amount & property value.",
    name: "Loan to Value (LTV) Calculator",
    description: "Calculate the loan-to-value (LTV) ratio from loan amount and property or asset value, with context on common LTV thresholds.",
    navCategory: "Finance",
    shellCategory: "Finance",
    icon: <HomeIcon fontSize="large" color="primary"/>,
    seoTitle: "Loan to Value (LTV) Calculator - LTV Ratio",
    seoDescription: "Free loan to value calculator. Enter loan amount and property value to calculate the LTV ratio and see how it compares to common lending thresholds.",
    keywords: ["loan to value calculator", "ltv calculator", "loan to value ratio calculator", "mortgage ltv calculator", "how to calculate ltv"],
    ogTitle: "Loan to Value (LTV) Calculator - LTV Ratio | ToolZoneX",
    ogDescription: "Calculate the loan-to-value ratio from loan amount and property value.",
    schemaName: "Loan to Value (LTV) Calculator",
    schemaDescription: "Calculate the loan-to-value ratio as loan amount divided by property or asset value, multiplied by 100.",
    applicationCategory: "FinanceApplication",
    currency: "USD",
    faqs: [{ question: "Why is 80% LTV such a common benchmark?", answer: "On conventional mortgages, 80% LTV (a 20% down payment) is the standard threshold below which lenders typically don't require private mortgage insurance, since the borrower's equity cushion is considered large enough to protect the lender if the loan defaults." }, { question: "Does a lower LTV always mean better loan terms?", answer: "Generally yes — lower LTV means less risk for the lender, which often translates into a lower interest rate, easier approval, and no mortgage insurance requirement. However, exact thresholds and pricing vary by lender, loan type, and loan program." }, { question: "What value should I use for the property?", answer: "Lenders typically use the lower of the appraised value or the purchase price when calculating LTV for a home purchase, and the appraised value alone for a refinance. Use whichever figure your lender has specified." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
