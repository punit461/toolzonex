import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/capital-gains-tax-calculator",
    navName: "Capital Gains Tax Calculator",
    navDescription: "Federal, NIIT & state tax on short/long-term gains.",
    name: "Capital Gains Tax Calculator",
    description: "Estimate federal, NIIT, and state tax on a short-term or long-term capital gain using 2026 brackets.",
    navCategory: "Finance",
    shellCategory: "Finance",
    icon: <TrendingUpIcon fontSize="large" color="primary"/>,
    seoTitle: "Capital Gains Tax Calculator - Short & Long-Term, by State",
    seoDescription: "Free capital gains tax calculator. Estimate federal, NIIT, and state tax on a short-term or long-term capital gain using 2026 IRS brackets.",
    keywords: ["capital gains tax calculator", "long term capital gains calculator", "short term capital gains tax", "capital gains tax by state", "niit calculator", "2026 capital gains brackets"],
    ogTitle: "Capital Gains Tax Calculator | ToolZoneX",
    ogDescription: "Estimate federal, NIIT, and state tax on a short-term or long-term capital gain using 2026 brackets.",
    schemaName: "Capital Gains Tax Calculator",
    schemaDescription: "Estimate federal, NIIT, and state tax on a short-term or long-term capital gain using 2026 brackets.",
    applicationCategory: "FinanceApplication",
    currency: "USD",
    faqs: [{ question: "Why does holding period matter so much?", answer: "Selling one day before the one-year mark can mean paying your full ordinary income rate (up to 37%) instead of the long-term rate (at most 20% federally) on the same dollar of gain — one of the largest single tax-timing decisions most investors make." }, { question: "Does this model my state's special capital gains treatment?", answer: "Most states tax capital gains as ordinary income using their regular brackets, which is what this calculator models by reusing each state's income tax rules. A few states have unique rules not modeled here — Washington, for example, levies a separate 7% excise tax only on gains above roughly $270,000, not its regular income tax (Washington has none). Verify your specific state's rules before relying on this for a real transaction." }, { question: "Is the NIIT calculation exact?", answer: "It's an approximation using your entered income + gain as a stand-in for MAGI. Real MAGI calculations can differ (certain deductions and foreign income adjustments apply) — this is a planning estimate, not a substitute for a tax professional." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
