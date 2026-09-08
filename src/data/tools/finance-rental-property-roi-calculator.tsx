import HomeWorkIcon from '@mui/icons-material/HomeWork';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/rental-property-roi-calculator",
    navName: "Rental Property ROI Calculator",
    navDescription: "Net operating income & ROI on a rental.",
    name: "Rental Property ROI Calculator",
    description: "Calculate net operating income (NOI) and net ROI for a rental property from purchase price, annual rental income, and annual expenses.",
    navCategory: "Finance",
    shellCategory: "Finance",
    icon: <HomeWorkIcon fontSize="large" color="primary"/>,
    seoTitle: "Rental Property ROI Calculator - Net ROI & NOI Calculator",
    seoDescription: "Free rental property ROI calculator. Enter purchase price, annual rent, and expenses to calculate net operating income (NOI) and net ROI.",
    keywords: ["rental property roi calculator", "rental roi calculator", "net operating income calculator", "rental property return calculator", "noi calculator"],
    ogTitle: "Rental Property ROI Calculator - Net ROI & NOI Calculator | ToolZoneX",
    ogDescription: "Calculate net operating income and net ROI for a rental property.",
    schemaName: "Rental Property ROI Calculator",
    schemaDescription: "Calculate net operating income (NOI) and net ROI for a rental property from purchase price, annual rental income, and annual expenses.",
    applicationCategory: "FinanceApplication",
    currency: "USD",
    faqs: [{ question: "How is this different from rental yield?", answer: "A basic rental yield calculation often only looks at gross rent against price. This calculator deliberately subtracts operating expenses first, producing net operating income and a net ROI that better reflects actual profitability — useful once you know your real running costs." }, { question: "What counts as an annual expense here?", answer: "Include maintenance and repairs, property tax, insurance, property management fees, and any other recurring holding costs. Leave out the mortgage payment itself if you want to see the property's unlevered return before financing costs." }, { question: "What's considered a good ROI for a rental property?", answer: "Many investors target a net ROI (or cap rate) of 6-10%, though acceptable ranges vary widely by market, property type, and how much appreciation potential is factored in separately." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
