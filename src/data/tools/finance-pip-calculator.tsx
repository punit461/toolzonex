import PaidIcon from '@mui/icons-material/Paid';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/pip-calculator",
    navName: "Pip Calculator",
    navDescription: "Calculate forex pip value.",
    name: "Pip Calculator",
    description: "Calculate the monetary value of a pip for your forex position. Free online pip value calculator.",
    navCategory: "Finance",
    shellCategory: "Finance",
    icon: <PaidIcon fontSize="large" color="primary"/>,
    seoTitle: "Pip Calculator - Forex Pip Value Calculator",
    seoDescription: "Free online forex pip calculator. Calculate the value of one pip for your lot size and exchange rate.",
    keywords: ["pip calculator", "forex pip", "pip value", "pip value calculator", "forex calculator", "lot size pip"],
    ogTitle: "Pip Calculator - Forex Pip Value | ToolZoneX",
    ogDescription: "Calculate the monetary value of a pip for your forex position.",
    schemaName: "Pip Calculator",
    schemaDescription: "Calculate the monetary value of a pip for your forex position.",
    applicationCategory: "FinanceApplication",
    currency: "USD",
    faqs: [{ question: "What is a pip?", answer: "A pip stands for \"percentage in point\" and is the standard unit of price change in forex. For most pairs it is the fourth decimal place (0.0001), but for JPY pairs it is the second decimal place (0.01)." }, { question: "Does the pip value change?", answer: "Yes — the pip value in your account currency depends on the current exchange rate. As the rate moves, the pip value fluctuates slightly. This calculator uses a fixed rate you provide." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
