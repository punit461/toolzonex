import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/college-savings-calculator",
    navName: "College Savings Calculator",
    navDescription: "Monthly savings needed for a child's college fund.",
    name: "College Savings Calculator - 529 & Education Savings Planning",
    description: "Calculate the required monthly contribution to reach a college savings goal based on your child's age, target college cost, and expected returns.",
    navCategory: "Finance",
    shellCategory: "Finance",
    icon: <AutoStoriesIcon fontSize="large" color="primary"/>,
    seoTitle: "College Savings Calculator - 529 & Education Savings Planning",
    seoDescription: "Free college savings calculator. Enter your child's age, target college cost, current savings, and expected return to find the required monthly contribution.",
    keywords: ["college savings calculator", "529 plan calculator", "education savings calculator", "how much to save for college", "college fund calculator"],
    ogTitle: "College Savings Calculator - 529 & Education Savings Planning | ToolZoneX",
    ogDescription: "Calculate the required monthly contribution to reach a college savings goal.",
    schemaName: "College Savings Calculator",
    schemaDescription: "Calculate the required monthly contribution to reach a college savings goal based on child's age, target college start age, estimated cost, current savings, and expected return.",
    applicationCategory: "FinanceApplication",
    currency: "USD",
    faqs: [{ question: "What is a 529 plan?", answer: "A 529 plan is a US tax-advantaged savings account specifically designed for education expenses. Rules, contribution limits, and state-specific tax benefits vary, so this tool doesn't provide specific tax or legal advice — consult a financial advisor for guidance tailored to your situation." }, { question: "How accurate are the college cost presets?", answer: "The in-state public and private presets are rough ballpark figures for a 4-year degree at today's prices, meant as a starting point. Actual costs vary widely by school and will likely rise with inflation by the time your child enrolls — use the custom option to enter your own more specific estimate." }, { question: "What if my child is already close to college age?", answer: "With less time to save, the required monthly contribution will be noticeably higher for the same target cost — the calculator will still compute it, but you may also want to consider adjusting your cost expectations or savings timeline." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
