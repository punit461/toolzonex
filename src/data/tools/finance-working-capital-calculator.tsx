import BalanceIcon from '@mui/icons-material/Balance';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/working-capital-calculator",
    navName: "Working Capital Calculator",
    navDescription: "Assets minus liabilities and current ratio.",
    name: "Working Capital Calculator",
    description: "Calculate working capital and the current ratio from current assets and current liabilities, with a health-band interpretation of liquidity.",
    navCategory: "Finance",
    shellCategory: "Finance",
    icon: <BalanceIcon fontSize="large" color="primary"/>,
    seoTitle: "Working Capital Calculator - Assets Minus Liabilities",
    seoDescription: "Free working capital calculator. Enter current assets and current liabilities to get working capital, current ratio, and a liquidity health check.",
    keywords: ["working capital calculator", "working capital formula", "current ratio calculator", "liquidity calculator", "net working capital"],
    ogTitle: "Working Capital Calculator - Assets Minus Liabilities | ToolZoneX",
    ogDescription: "Calculate working capital and current ratio from current assets and liabilities.",
    schemaName: "Working Capital Calculator",
    schemaDescription: "Calculate working capital and the current ratio from current assets and current liabilities.",
    applicationCategory: "FinanceApplication",
    currency: "USD",
    faqs: [{ question: "What counts as a current asset or current liability?", answer: "Current assets are cash and items expected to convert to cash within a year — cash, accounts receivable, and inventory. Current liabilities are obligations due within a year, such as accounts payable, short-term loans, and accrued expenses." }, { question: "Is negative working capital always bad?", answer: "Usually it signals liquidity risk, but some business models (high-volume retailers with fast inventory turnover) operate with negative working capital by design. Context and industry norms matter." }, { question: "What is considered a good current ratio?", answer: "A ratio between 1.5 and 2.0 is generally considered healthy for most industries. Below 1.0 suggests potential trouble covering short-term debts, while a very high ratio can indicate underused assets." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
