import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/tax-calculator",
    navName: "US Tax Calculator",
    navDescription: "Estimate US federal income tax by filing status.",
    name: "US Federal Tax Calculator",
    description: "Estimate US federal income tax owed, effective rate, and marginal rate by filing status using current-year brackets and the standard deduction.",
    navCategory: "Finance",
    shellCategory: "Finance",
    icon: <RequestQuoteIcon fontSize="large" color="primary"/>,
    seoTitle: "US Tax Calculator - Federal Income Tax Estimator",
    seoDescription: "Free US federal income tax calculator. Estimate your tax owed, effective rate, and marginal rate by filing status using current-year IRS brackets.",
    keywords: ["tax calculator", "US tax calculator", "federal income tax calculator", "effective tax rate calculator", "marginal tax rate calculator", "income tax estimator USA", "IRS tax brackets calculator"],
    ogTitle: "US Tax Calculator - Federal Income Tax Estimator | ToolZoneX",
    ogDescription: "Estimate your US federal tax owed, effective rate, and marginal rate by filing status.",
    schemaName: "US Federal Tax Calculator",
    schemaDescription: "Estimate US federal income tax owed, effective rate, and marginal rate by filing status.",
    applicationCategory: "FinanceApplication",
    currency: "USD",
    faqs: [{ question: "Is this the same as the site's Income Tax Calculator?", answer: "No. This is a US federal tax estimator using IRS brackets, filing statuses, and the standard deduction. The site's separate Income Tax Calculator estimates Indian income tax under the Old and New regimes for a given financial year — use that one instead if you're filing taxes in India." }, { question: "What's the difference between marginal and effective tax rate?", answer: "Your marginal rate is what you pay on your next dollar of income — it only applies to the top slice of your earnings. Your effective rate is your total tax divided by total income, blending all the lower brackets you passed through first, which is why it's always lower than (or equal to) your marginal rate." }, { question: "Does this include state tax or FICA?", answer: "No — this estimates federal income tax only. It doesn't include state/local income tax, or Social Security and Medicare (FICA) payroll taxes, which reduce a paycheck further on top of federal withholding." }, { question: "Does this use itemized deductions?", answer: "No — it assumes the standard deduction for your filing status. If your itemized deductions (mortgage interest, charitable giving, state taxes paid, etc.) exceed the standard deduction, your actual tax bill would be lower than this estimate." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
