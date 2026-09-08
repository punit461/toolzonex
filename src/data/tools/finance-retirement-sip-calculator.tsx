import SavingsIcon from '@mui/icons-material/Savings';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/retirement-sip-calculator",
    navName: "Retirement SIP Calculator",
    navDescription: "Projected corpus from monthly SIP.",
    name: "Retirement SIP Calculator",
    description: "Project your retirement corpus from a monthly SIP investment, expected annual return, and years until retirement using the standard SIP future value formula.",
    navCategory: "Finance",
    shellCategory: "Finance",
    icon: <SavingsIcon fontSize="large" color="primary"/>,
    seoTitle: "Retirement SIP Calculator - Project Your Retirement Corpus",
    seoDescription: "Free retirement SIP calculator. Enter monthly SIP amount, expected return, and years to retirement to project your future retirement corpus.",
    keywords: ["retirement sip calculator", "sip retirement planning", "retirement corpus calculator", "monthly sip calculator", "sip future value calculator"],
    ogTitle: "Retirement SIP Calculator - Project Your Retirement Corpus | ToolZoneX",
    ogDescription: "Project your retirement corpus from a monthly SIP, expected return, and years to retirement.",
    schemaName: "Retirement SIP Calculator",
    schemaDescription: "Project a retirement corpus from a monthly SIP investment, expected annual return, and years until retirement.",
    applicationCategory: "FinanceApplication",
    currency: "USD",
    faqs: [{ question: "What return rate should I assume?", answer: "This depends on your investment mix. Diversified equity portfolios have historically returned around 8-12% annually over long periods, though returns vary year to year and future results aren't guaranteed. Conservative investors may prefer a lower assumed rate." }, { question: "Does this account for inflation?", answer: "No — this shows the nominal future value of your investments. To estimate purchasing power in today's terms, use the Inflation Calculator to adjust the projected corpus for expected inflation over the same period." }, { question: "What if I want to increase my SIP amount every year?", answer: "This calculator assumes a fixed monthly SIP amount throughout the period. A \"step-up SIP\" that increases contributions annually will generally produce a larger corpus than shown here." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
