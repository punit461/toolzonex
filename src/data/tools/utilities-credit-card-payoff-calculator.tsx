import CreditCardIcon from '@mui/icons-material/CreditCard';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/credit-card-payoff-calculator",
    navName: "Credit Card Payoff Calculator",
    navDescription: "Find your payoff time or required payment.",
    name: "Credit Card Payoff Calculator",
    description: "Calculate how long it will take to pay off a credit card balance, or the monthly payment needed to hit a target timeframe.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <CreditCardIcon fontSize="large" color="primary"/>,
    seoTitle: "Credit Card Payoff Calculator - Payoff Time & Payment",
    seoDescription: "Free credit card payoff calculator. Find how many months it takes to pay off a balance and total interest paid, or the payment needed for a target payoff date.",
    keywords: ["credit card payoff calculator", "credit card payment calculator", "how long to pay off credit card", "credit card interest calculator", "debt payoff calculator"],
    ogTitle: "Credit Card Payoff Calculator - Payoff Time & Payment | ToolZoneX",
    ogDescription: "Calculate your credit card payoff time or required monthly payment.",
    schemaName: "Credit Card Payoff Calculator",
    schemaDescription: "Calculate months to pay off a credit card balance and total interest paid from a fixed payment, or the payment required for a target timeframe.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "Why does it say my balance will never be paid off?", answer: "This happens when your monthly payment is less than or equal to the interest charged that month — the balance never shrinks, and can even grow over time. Increase your monthly payment above the current interest charge (balance × APR ÷ 12) to make progress on the principal." }, { question: "Does this account for new purchases added to the card?", answer: "No — this assumes no new charges are added and only the starting balance is being paid down, which gives the cleanest picture of how a fixed payment plan performs. Adding new purchases each month will extend the payoff time and increase total interest beyond this estimate." }, { question: "Why is credit card APR usually so much higher than other loans?", answer: "Credit cards are unsecured debt with no collateral backing them, which makes them riskier for lenders, so issuers typically charge much higher interest rates than secured loans like mortgages or auto loans to compensate for that risk." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
