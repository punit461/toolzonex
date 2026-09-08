import BalanceIcon from '@mui/icons-material/Balance';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/debt-ratio-calculator",
    navName: "Debt Ratio Calculator",
    navDescription: "Total liabilities as a share of total assets.",
    name: "Debt Ratio Calculator",
    description: "Calculate the debt ratio from total liabilities and total assets to measure how much of a company's assets are financed by debt.",
    navCategory: "Finance",
    shellCategory: "Finance",
    icon: <BalanceIcon fontSize="large" color="primary"/>,
    seoTitle: "Debt Ratio Calculator - Total Liabilities to Total Assets",
    seoDescription: "Free debt ratio calculator. Enter total liabilities and total assets to calculate a company's debt ratio as a decimal and a percentage.",
    keywords: ["debt ratio calculator", "debt to assets ratio calculator", "total debt ratio calculator", "leverage ratio calculator", "liabilities to assets calculator"],
    ogTitle: "Debt Ratio Calculator - Total Liabilities to Total Assets | ToolZoneX",
    ogDescription: "Calculate the debt ratio from total liabilities and total assets.",
    schemaName: "Debt Ratio Calculator",
    schemaDescription: "Calculate the debt ratio (total liabilities divided by total assets) as a decimal and a percentage.",
    applicationCategory: "FinanceApplication",
    currency: "USD",
    faqs: [{ question: "How is this different from the Debt-to-Equity Calculator?", answer: "Both measure leverage from the same balance sheet, but they use different denominators. The Debt-to-Equity Calculator divides total liabilities by total shareholder equity, showing how debt compares to equity directly. This Debt Ratio Calculator instead divides total liabilities by total assets, showing what share of everything the company owns is funded by debt. The two ratios move together but aren't interchangeable — a company can have a moderate debt ratio and still a high debt-to-equity ratio if its equity base is small." }, { question: "What's considered a healthy debt ratio?", answer: "There's no single universal cutoff, but a debt ratio below 0.5 (50%) is often viewed as conservative, meaning more than half of assets are equity-financed. Ratios above 0.6-0.7 are considered more highly leveraged, though acceptable levels vary a lot by industry — capital-intensive sectors like utilities and real estate typically run higher than software or services companies." }, { question: "Where do I find total liabilities and total assets?", answer: "Both figures come directly from a company's balance sheet. Total assets is usually the top-line total (current plus non-current assets), and total liabilities is the corresponding total on the liabilities side, listed just above the shareholder equity section." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
