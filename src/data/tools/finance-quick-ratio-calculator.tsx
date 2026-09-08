import BoltIcon from '@mui/icons-material/Bolt';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/quick-ratio-calculator",
    navName: "Quick Ratio Calculator",
    navDescription: "Acid-test liquidity ratio calculator.",
    name: "Quick Ratio Calculator - Acid-Test Ratio",
    description: "Calculate the quick ratio (acid-test ratio) from current assets, inventory, prepaid expenses, and current liabilities, with a health-band interpretation.",
    navCategory: "Finance",
    shellCategory: "Finance",
    icon: <BoltIcon fontSize="large" color="primary"/>,
    seoTitle: "Quick Ratio Calculator - Acid-Test Liquidity Ratio",
    seoDescription: "Free quick ratio (acid-test) calculator. Enter current assets, inventory, prepaid expenses, and current liabilities to get a stricter liquidity ratio.",
    keywords: ["quick ratio calculator", "acid test ratio calculator", "liquidity ratio calculator", "quick assets calculator", "financial ratio calculator"],
    ogTitle: "Quick Ratio Calculator - Acid-Test Liquidity Ratio | ToolZoneX",
    ogDescription: "Calculate the quick ratio (acid-test ratio) for a stricter view of liquidity.",
    schemaName: "Quick Ratio Calculator",
    schemaDescription: "Calculate the quick ratio (acid-test ratio) from current assets, inventory, prepaid expenses, and current liabilities.",
    applicationCategory: "FinanceApplication",
    currency: "USD",
    faqs: [{ question: "How is this different from the Current Ratio Calculator?", answer: "The Current Ratio Calculator divides all current assets by current liabilities, treating inventory the same as cash. This quick ratio (acid-test) excludes inventory and prepaid expenses — less liquid assets — giving a stricter measure of a business's immediate ability to pay short-term debts." }, { question: "What counts as a good quick ratio?", answer: "A quick ratio of 1.0 or higher is generally considered healthy, meaning quick assets alone can cover current liabilities without needing to sell inventory. Ratios below 1.0 warrant a closer look at cash flow." }, { question: "Why exclude prepaid expenses?", answer: "Prepaid expenses (like prepaid insurance or rent) represent value already used up in advance — they can't be converted back into cash to pay a bill, so the quick ratio leaves them out of the numerator." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
