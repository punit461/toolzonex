import HomeWorkIcon from '@mui/icons-material/HomeWork';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/property-appreciation-calculator",
    navName: "Property Appreciation Calculator",
    navDescription: "Future property value from appreciation rate.",
    name: "Property Appreciation Calculator",
    description: "Calculate a property's future value from its current value, expected annual appreciation rate, and number of years using compound growth.",
    navCategory: "Finance",
    shellCategory: "Finance",
    icon: <HomeWorkIcon fontSize="large" color="primary"/>,
    seoTitle: "Property Appreciation Calculator - Future Home Value",
    seoDescription: "Free property appreciation calculator. Enter current value, appreciation rate, and years to project future property value and total gain.",
    keywords: ["property appreciation calculator", "home appreciation calculator", "future home value calculator", "real estate appreciation calculator", "property value growth calculator"],
    ogTitle: "Property Appreciation Calculator - Future Home Value | ToolZoneX",
    ogDescription: "Calculate a property's future value from current value, appreciation rate, and years.",
    schemaName: "Property Appreciation Calculator",
    schemaDescription: "Calculate a property's future value from its current value, expected annual appreciation rate, and number of years.",
    applicationCategory: "FinanceApplication",
    currency: "USD",
    faqs: [{ question: "What appreciation rate should I use?", answer: "Historical long-term US home price appreciation has averaged roughly 3-5% annually, though this varies significantly by location, property type, and market cycle. Use local historical data or a conservative estimate if you're uncertain." }, { question: "Is appreciation guaranteed?", answer: "No — property values can also decline, especially over shorter time horizons or during market downturns. This calculator shows a projection based on a constant assumed rate, not a guaranteed outcome." }, { question: "Does this include renovations or capital improvements?", answer: "No — this projects appreciation from market forces on the property as-is. Renovations, additions, or major improvements can add value beyond what pure market appreciation would produce, and would need to be estimated separately." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
