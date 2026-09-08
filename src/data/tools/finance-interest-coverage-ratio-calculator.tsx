import BalanceIcon from '@mui/icons-material/Balance';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/interest-coverage-ratio-calculator",
    navName: "Interest Coverage Ratio Calculator",
    navDescription: "EBIT ÷ interest expense.",
    name: "Interest Coverage Ratio Calculator",
    description: "Calculate the interest coverage ratio from EBIT and interest expense, with a status against commonly cited healthy thresholds.",
    navCategory: "Finance",
    shellCategory: "Finance",
    icon: <BalanceIcon fontSize="large" color="primary"/>,
    seoTitle: "Interest Coverage Ratio Calculator - EBIT ÷ Interest Expense",
    seoDescription: "Free interest coverage ratio calculator. Enter EBIT and interest expense to find the interest coverage ratio and its status.",
    keywords: ["interest coverage ratio calculator", "times interest earned calculator", "ebit interest expense ratio calculator", "how to calculate interest coverage ratio", "interest coverage ratio formula"],
    ogTitle: "Interest Coverage Ratio Calculator - EBIT ÷ Interest Expense | ToolZoneX",
    ogDescription: "Calculate the interest coverage ratio from EBIT and interest expense.",
    schemaName: "Interest Coverage Ratio Calculator",
    schemaDescription: "Calculate the interest coverage ratio (EBIT ÷ interest expense) and its status against common healthy thresholds.",
    applicationCategory: "FinanceApplication",
    currency: "USD",
    faqs: [{ question: "What's a healthy interest coverage ratio?", answer: "A ratio of 2x to 3x or higher is commonly cited as healthy, though acceptable levels vary by industry and how cyclical or stable a company's earnings are. Capital-intensive industries with steady cash flows can sometimes operate safely at lower ratios than volatile-earnings businesses." }, { question: "How is this different from the Debt Service Coverage Ratio (DSCR)?", answer: "This ratio divides EBIT by interest expense only. DSCR divides net operating income by total annual debt service, which includes both principal and interest. Because DSCR's denominator is larger, it typically produces a lower, more conservative ratio than interest coverage for the same business." }, { question: "What does a ratio below 1.0x mean?", answer: "It means operating earnings aren't even sufficient to cover interest payments, which is a serious red flag that typically requires drawing on cash reserves, additional financing, or asset sales to stay current on debt." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
