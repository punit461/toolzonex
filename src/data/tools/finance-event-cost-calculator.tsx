import EventIcon from '@mui/icons-material/Event';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/event-cost-calculator",
    navName: "Event Cost Calculator",
    navDescription: "Itemized total cost for a formal event.",
    name: "Event Cost Calculator",
    description: "Build a total event cost from itemized line items like venue rental, per-head catering, AV equipment, and staffing.",
    navCategory: "Finance",
    shellCategory: "Finance",
    icon: <EventIcon fontSize="large" color="primary"/>,
    seoTitle: "Event Cost Calculator - Itemized Event Budget",
    seoDescription: "Free event cost calculator. Add line items like venue, catering, AV equipment, and staffing to get a total itemized cost for a corporate or formal event.",
    keywords: ["event cost calculator", "event budget calculator", "corporate event cost calculator", "event planning cost calculator", "itemized event budget"],
    ogTitle: "Event Cost Calculator - Itemized Event Budget | ToolZoneX",
    ogDescription: "Build a total event cost from itemized line items.",
    schemaName: "Event Cost Calculator",
    schemaDescription: "Build a total event cost from itemized line items such as venue, catering, AV equipment, and staffing.",
    applicationCategory: "FinanceApplication",
    currency: "USD",
    faqs: [{ question: "How is this different from the Party Budget Calculator?", answer: "The Party Budget Calculator splits one overall budget into rough percentages across a handful of broad categories — a quick, casual approach for birthdays or family celebrations. This calculator instead builds a total from the ground up, adding specific, itemized line items with real quantities and unit costs, which suits larger or more formal events where you already have (or need) detailed vendor-level numbers." }, { question: "How should I handle a per-head cost like catering?", answer: "Set the quantity to your expected headcount and the unit cost to the per-person price, so the line total automatically scales if your headcount changes — no need to recalculate the catering total by hand." }, { question: "Should I include a contingency line?", answer: "Yes — it's common practice to add a contingency or miscellaneous line worth around 5-10% of the expected total to absorb last-minute additions, price changes, or unexpected vendor fees." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
