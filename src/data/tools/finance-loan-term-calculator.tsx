import TimerIcon from '@mui/icons-material/Timer';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/loan-term-calculator",
    navName: "Loan Term Calculator",
    navDescription: "Time to pay off a loan at a given EMI.",
    name: "Loan Term Calculator",
    description: "Find out how long it takes to pay off a loan given the amount, rate, and monthly payment. Free online loan term / payoff calculator.",
    navCategory: "Finance",
    shellCategory: "Finance",
    icon: <TimerIcon fontSize="large" color="primary"/>,
    seoTitle: "Loan Term Calculator - How Long to Pay Off a Loan",
    seoDescription: "Free online loan term calculator. Enter the loan amount, interest rate, and monthly payment to get the months to payoff, total interest, and recommended payment.",
    keywords: ["loan term calculator", "loan payoff calculator", "how long to pay off loan", "emi tenure calculator", "loan repayment time", "payoff time calculator"],
    ogTitle: "Loan Term Calculator - Months to Payoff | ToolZoneX",
    ogDescription: "See how many months it takes to clear any loan at your monthly payment.",
    schemaName: "Loan Term Calculator",
    schemaDescription: "Calculate how long it takes to pay off a loan given the amount, rate, and monthly payment.",
    applicationCategory: "FinanceApplication",
    currency: "USD",
    faqs: [{ question: "What is the payoff formula?", answer: "For a reducing-balance loan the number of months is n = −ln(1 − Pr/P) / ln(1 + r), where P is the principal, r the monthly rate, and M the monthly payment." }, { question: "Why does it warn 'payment won't cover interest'?", answer: "If your monthly payment is less than or equal to the interest accruing each month (M ≤ P × r), the balance never shrinks — you would pay forever. Increase the payment until the warning clears." }, { question: "How can I shorten my term?", answer: "Increase your monthly payment. Even a small extra amount cuts years off a long loan because it attacks the principal directly, reducing the interest that compounds each month." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
