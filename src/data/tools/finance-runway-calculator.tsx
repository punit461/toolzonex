import FlightIcon from '@mui/icons-material/Flight';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/runway-calculator",
    navName: "Runway Calculator",
    navDescription: "Months of cash left from balance and burn rate.",
    name: "Runway Calculator",
    description: "Calculate startup cash runway in months from current cash balance, monthly expenses, and optional monthly revenue.",
    navCategory: "Finance",
    shellCategory: "Finance",
    icon: <FlightIcon fontSize="large" color="primary"/>,
    seoTitle: "Runway Calculator - Startup Cash Runway in Months",
    seoDescription: "Free startup runway calculator. Enter cash balance, monthly expenses, and revenue to calculate runway in months and an estimated end date.",
    keywords: ["runway calculator", "startup runway calculator", "cash runway calculator", "burn rate calculator", "months of runway left"],
    ogTitle: "Runway Calculator - Startup Cash Runway in Months | ToolZoneX",
    ogDescription: "Calculate startup cash runway in months from cash balance, monthly expenses, and revenue.",
    schemaName: "Runway Calculator",
    schemaDescription: "Calculate cash runway in months as cash balance divided by net monthly burn (expenses minus revenue), plus an estimated runway end date.",
    applicationCategory: "FinanceApplication",
    currency: "USD",
    faqs: [{ question: "What if my revenue exceeds my expenses?", answer: "Then your net burn is zero or negative, meaning you're cash-flow positive and don't have a runway problem — the calculator will not show a runway figure in that case since you're not burning cash." }, { question: "Should I use gross burn or net burn?", answer: "Net burn (expenses minus revenue) gives a more realistic picture of how fast your cash balance is actually shrinking. Gross burn (expenses alone) is useful too, but leaving revenue out of the field will effectively calculate gross-burn runway instead." }, { question: "Is the \"runway ends\" date exact?", answer: "It's an estimate based on your current burn rate staying constant. Real burn rates fluctuate month to month with hiring, one-time expenses, and revenue changes, so treat the date as a planning guide rather than a guarantee." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
