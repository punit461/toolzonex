import FunctionsIcon from '@mui/icons-material/Functions';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/rule-of-72-calculator",
    navName: "Rule of 72 Calculator",
    navDescription: "Years to double an investment.",
    name: "Rule of 72 Calculator",
    description: "Estimate how long it takes an investment to double using the Rule of 72, or find the rate needed to double your money in a target number of years.",
    navCategory: "Finance",
    shellCategory: "Finance",
    icon: <FunctionsIcon fontSize="large" color="primary"/>,
    seoTitle: "Rule of 72 Calculator - Years to Double Your Investment",
    seoDescription: "Free Rule of 72 calculator. Find how many years it takes to double your investment at a given rate, or the rate needed to double in a target timeframe.",
    keywords: ["rule of 72 calculator", "rule of 72", "years to double investment", "doubling time calculator", "compound interest shortcut"],
    ogTitle: "Rule of 72 Calculator - Years to Double Your Investment | ToolZoneX",
    ogDescription: "Estimate years to double an investment, or the rate needed to double it, using the Rule of 72.",
    schemaName: "Rule of 72 Calculator",
    schemaDescription: "Estimate how long it takes an investment to double using the Rule of 72.",
    applicationCategory: "FinanceApplication",
    currency: "USD",
    faqs: [{ question: "How accurate is the Rule of 72?", answer: "It's a close approximation for annual rates roughly between 6% and 10%, with the exact doubling time given by ln(2) / ln(1 + r). Outside that range, the estimate drifts slightly, but it's accurate enough for quick mental math in almost all practical cases." }, { question: "Does the Rule of 72 assume compounding?", answer: "Yes — it assumes the return compounds annually. It does not apply cleanly to simple (non-compounding) interest, where growth is linear rather than exponential." }, { question: "Can I use it for inflation too?", answer: "Yes — the same shortcut estimates how long it takes prices to double at a given inflation rate. For example, at 3% annual inflation, prices roughly double every 24 years." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
