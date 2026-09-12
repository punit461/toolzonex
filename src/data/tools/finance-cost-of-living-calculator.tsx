import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/cost-of-living-calculator",
    navName: "Cost of Living Calculator",
    navDescription: "Equivalent salary between two cities.",
    name: "Cost of Living Calculator",
    description: "Calculate the equivalent salary needed in a different city from your current salary and both cities' cost-of-living index numbers.",
    navCategory: "Finance",
    shellCategory: "Finance",
    icon: <CompareArrowsIcon fontSize="large" color="primary"/>,
    seoTitle: "Cost of Living Calculator - Compare Salaries Between Cities",
    seoDescription: "Free cost of living calculator. Enter your salary and the cost-of-living index for your current and target city to find the equivalent salary you'd need.",
    keywords: ["cost of living calculator", "cost of living comparison calculator", "salary comparison by city calculator", "cost of living index calculator", "relocation salary calculator"],
    ogTitle: "Cost of Living Calculator - Compare Cities | ToolZoneX",
    ogDescription: "Find the equivalent salary needed in a different city.",
    schemaName: "Cost of Living Calculator",
    schemaDescription: "Calculate the equivalent salary needed in a different city from your current salary and both cities' cost-of-living index numbers.",
    applicationCategory: "FinanceApplication",
    currency: "USD",
    faqs: [{ question: "Where do I find cost-of-living index numbers for a city?", answer: "Several public sources publish city and metro-area cost-of-living indexes, usually benchmarked against a baseline city or national average (often set to 100). Search for a cost-of-living index by city name to find current figures, and make sure both numbers you enter come from the same source, since different sources use different baselines and methodology." }, { question: "Does this account for taxes?", answer: "No — cost-of-living indexes typically measure everyday expenses like housing, groceries, transportation, and utilities, not income tax rates. State and local taxes can differ significantly between cities and should be considered separately alongside this comparison." }, { question: "Is a single index number enough to compare cities?", answer: "It's a useful starting estimate, but a single blended index can hide big differences in specific categories — one city might have much cheaper groceries but far more expensive housing. For a bigger decision, look at the category breakdown behind the index, not just the overall number." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
