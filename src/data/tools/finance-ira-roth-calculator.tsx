import SavingsIcon from '@mui/icons-material/Savings';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/ira-roth-calculator",
    navName: "IRA & Roth IRA Calculator",
    navDescription: "2026 contribution limits, Roth eligibility & deduction phase-out.",
    name: "IRA & Roth IRA Contribution Calculator",
    description: "Check your 2026 IRA contribution limit, Roth IRA eligibility by income, and Traditional IRA deduction phase-out.",
    navCategory: "Finance",
    shellCategory: "Finance",
    icon: <SavingsIcon fontSize="large" color="primary"/>,
    seoTitle: "IRA & Roth IRA Calculator - 2026 Contribution Limits & Eligibility",
    seoDescription: "Free IRA and Roth IRA calculator. Check your 2026 contribution limit, Roth IRA income eligibility, and Traditional IRA deduction phase-out by filing status.",
    keywords: ["ira calculator", "roth ira calculator", "roth ira income limit", "traditional ira deduction", "ira contribution limit 2026", "backdoor roth"],
    ogTitle: "IRA & Roth IRA Calculator - 2026 Contribution Limits & Eligibility | ToolZoneX",
    ogDescription: "Check your 2026 IRA contribution limit, Roth eligibility by income, and Traditional IRA deduction phase-out.",
    schemaName: "IRA & Roth IRA Contribution Calculator",
    schemaDescription: "Check your 2026 IRA contribution limit, Roth IRA eligibility by income, and Traditional IRA deduction phase-out.",
    applicationCategory: "FinanceApplication",
    currency: "USD",
    faqs: [{ question: "What if my Roth contribution is limited — can I still contribute the rest to a Traditional IRA?", answer: "Yes. The IRA contribution limit is a combined cap across Traditional and Roth IRAs, not a separate limit for each. If you're phased out of a full Roth contribution, you can split the remainder into a Traditional IRA (deductible or not, depending on your coverage situation)." }, { question: "What's a \"backdoor Roth\"?", answer: "If your income is above the Roth phase-out, you can still contribute to a Traditional IRA (non-deductible if you're covered by a workplace plan and over the deduction limit) and then convert it to a Roth IRA — there's no income limit on conversions, only on direct contributions. This has tax implications if you hold other pre-tax IRA balances (the pro-rata rule); consult a tax professional before doing this." }, { question: "Is this exact to the dollar?", answer: "The phase-out uses the IRS's standard linear reduction rounded down to the nearest $10, with the $200 minimum once any amount survives — the same method the IRS worksheet uses. Always confirm your exact allowed contribution using IRS Publication 590-A or a tax professional before filing." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
