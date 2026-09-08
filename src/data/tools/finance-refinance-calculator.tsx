import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/refinance-calculator",
    navName: "Refinance Calculator",
    navDescription: "New payment, interest savings & break-even.",
    name: "Refinance Calculator",
    description: "Calculate your new monthly payment, total interest savings, and break-even period when refinancing a loan, from current and new loan terms plus closing costs.",
    navCategory: "Finance",
    shellCategory: "Finance",
    icon: <SwapHorizIcon fontSize="large" color="primary"/>,
    seoTitle: "Refinance Calculator - Refinance Savings & Break-Even",
    seoDescription: "Free refinance calculator. Compare current and new loan terms to see new monthly payment, interest savings, and the break-even period on closing costs.",
    keywords: ["refinance calculator", "mortgage refinance calculator", "refinance break even calculator", "refinance savings calculator", "should i refinance calculator"],
    ogTitle: "Refinance Calculator - Refinance Savings & Break-Even | ToolZoneX",
    ogDescription: "Calculate refinance savings, new monthly payment, and break-even period.",
    schemaName: "Refinance Calculator",
    schemaDescription: "Calculate new monthly payment, total interest savings, and break-even period when refinancing a loan.",
    applicationCategory: "FinanceApplication",
    currency: "USD",
    faqs: [{ question: "What if the new payment is higher than the old one?", answer: "If monthly savings are zero or negative, there's no break-even point to recoup closing costs from lower payments — refinancing would only make sense for other reasons, like switching from an adjustable to a fixed rate, or cashing out equity." }, { question: "Should I judge a refinance only by monthly savings?", answer: "No — also compare total interest paid over the full loan life. Extending the term can lower your monthly payment while actually increasing total interest paid, even at a lower rate, so check both figures before deciding." }, { question: "How long should I plan to stay in the loan to make refinancing worth it?", answer: "A common rule of thumb is to only refinance if you plan to keep the loan well beyond the break-even period shown here. If you might sell or pay off the loan sooner than that, the closing costs may not be fully recovered." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
