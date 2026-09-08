import PriceChangeIcon from '@mui/icons-material/PriceChange';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/inflation-calculator",
    navName: "Inflation Calculator",
    navDescription: "Purchasing power over time using US CPI-U data.",
    name: "US Inflation Calculator",
    description: "Calculate the equivalent purchasing power of an amount between any two years using historical US CPI-U inflation data.",
    navCategory: "Finance",
    shellCategory: "Finance",
    icon: <PriceChangeIcon fontSize="large" color="primary"/>,
    seoTitle: "Inflation Calculator - US CPI Purchasing Power (1960-2025)",
    seoDescription: "Free US inflation calculator using historical CPI-U data from 1960-2025. See the equivalent purchasing power of any amount between two years.",
    keywords: ["inflation calculator", "US inflation calculator", "CPI calculator", "purchasing power calculator", "inflation rate calculator", "what is $1000 worth today"],
    ogTitle: "Inflation Calculator - US CPI Purchasing Power (1960-2025) | ToolZoneX",
    ogDescription: "See the equivalent purchasing power of any amount between two years using US CPI data.",
    schemaName: "US Inflation Calculator",
    schemaDescription: "Calculate equivalent purchasing power between any two years using historical US CPI-U data.",
    applicationCategory: "FinanceApplication",
    currency: "USD",
    faqs: [{ question: "What is CPI-U and where does this data come from?", answer: "CPI-U is the Consumer Price Index for All Urban Consumers, published monthly by the US Bureau of Labor Statistics. This calculator uses annual average index values from 1960 through 2025; the most recent year's figure is approximate and may be revised — check bls.gov for the official, up-to-date index." }, { question: "Can I calculate purchasing power going backward in time?", answer: "Yes — set the start year later than the end year (e.g. start 2025, end 1990) and the calculator applies the same ratio in reverse, showing what today's amount would have been worth in the earlier year." }, { question: "Does this account for regional cost-of-living differences?", answer: "No — CPI-U is a national US average. Actual inflation experienced in a specific city, or for a specific household's spending mix (housing, healthcare, etc.), can run higher or lower than the national average shown here." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
