import CreditCardIcon from '@mui/icons-material/CreditCard';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/credit-score-estimator",
    navName: "Credit Score Estimator",
    navDescription: "Rough estimated score range from FICO factors.",
    name: "Credit Score Estimator - Educational Score Range Estimate",
    description: "Get a rough, educational estimated credit score range based on the standard FICO factor categories. Not your real credit score.",
    navCategory: "Finance",
    shellCategory: "Finance",
    icon: <CreditCardIcon fontSize="large" color="primary"/>,
    seoTitle: "Credit Score Estimator - Educational Score Range Estimate",
    seoDescription: "Free credit score estimator. Answer simple questions about the 5 FICO factors to get a rough estimated score range — not your real credit score.",
    keywords: ["credit score estimator", "estimate my credit score", "credit score calculator", "fico score estimator", "what's my credit score range"],
    ogTitle: "Credit Score Estimator - Educational Score Range Estimate | ToolZoneX",
    ogDescription: "Get a rough, educational estimated credit score range based on the standard FICO factor categories.",
    schemaName: "Credit Score Estimator",
    schemaDescription: "Estimate a rough credit score range from qualitative answers about the 5 standard FICO factor categories, for educational purposes only.",
    applicationCategory: "FinanceApplication",
    currency: undefined,
    faqs: [{ question: "Is this my actual credit score?", answer: "No. This is an educational estimate based on the standard FICO factor weightings and simple qualitative answers. Your real score is calculated by credit bureaus from your full credit report and can differ significantly from this estimate. Always check an actual credit bureau (Equifax, Experian, TransUnion) or your bank/card issuer for your real score." }, { question: "Why does this only give a range instead of an exact number?", answer: "Real credit scoring models use precise numeric data from your credit report — exact balances, exact account ages, exact inquiry dates — that this tool doesn't have access to. Simple category answers can only support a broad estimated range, not a precise score." }, { question: "What's the single biggest factor I can control?", answer: "Payment history (~35%) and credit utilization (~30%) together make up about two-thirds of a typical FICO score — paying on time, every time, and keeping credit card balances low relative to your limits are generally the two most impactful habits." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
