import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/economic-value-added-calculator",
    navName: "Economic Value Added (EVA) Calculator",
    navDescription: "EVA from NOPAT, invested capital, and WACC.",
    name: "Economic Value Added (EVA) Calculator",
    description: "Calculate Economic Value Added from Net Operating Profit After Tax, invested capital, and Weighted Average Cost of Capital.",
    navCategory: "Finance",
    shellCategory: "Finance",
    icon: <AutoGraphIcon fontSize="large" color="primary"/>,
    seoTitle: "EVA Calculator - Economic Value Added Calculator",
    seoDescription: "Free economic value added (EVA) calculator. Enter NOPAT, invested capital, and WACC to calculate EVA and capital charge.",
    keywords: ["eva calculator", "economic value added calculator", "nopat calculator", "wacc capital charge calculator", "economic profit calculator"],
    ogTitle: "EVA Calculator - Economic Value Added Calculator | ToolZoneX",
    ogDescription: "Calculate Economic Value Added from NOPAT, invested capital, and WACC.",
    schemaName: "Economic Value Added (EVA) Calculator",
    schemaDescription: "Calculate EVA as NOPAT minus the product of invested capital and WACC percentage.",
    applicationCategory: "FinanceApplication",
    currency: "USD",
    faqs: [{ question: "What does a negative EVA mean?", answer: "A negative EVA means the business isn't generating enough operating profit to cover the cost of the capital invested in it — it can be accounting-profitable while still destroying economic value for shareholders." }, { question: "How is NOPAT different from net income?", answer: "NOPAT is operating profit after tax but before financing costs like interest, so it reflects the profitability of core operations independent of how the company is financed — net income includes interest expense and other non-operating items." }, { question: "Where does the WACC figure come from?", answer: "WACC blends the cost of a company's debt and equity, weighted by how much of each is used to fund the business. It's typically calculated separately (or sourced from financial data providers) and entered here as an input." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
