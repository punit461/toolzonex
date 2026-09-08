import BadgeIcon from '@mui/icons-material/Badge';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/business-card-quantity-calculator",
    navName: "Business Card Quantity Calculator",
    navDescription: "Total cards & boxes needed for a team.",
    name: "Business Card Quantity Calculator",
    description: "Calculate total business cards and boxes needed from employee count, cards per person, and a reorder buffer percentage.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <BadgeIcon fontSize="large" color="primary"/>,
    seoTitle: "Business Card Quantity Calculator - Cards & Boxes Needed",
    seoDescription: "Free business card quantity calculator. Enter employee count and cards per person to calculate total cards and boxes needed to order.",
    keywords: ["business card quantity calculator", "how many business cards do i need", "business card order calculator", "business card box calculator", "office supply calculator"],
    ogTitle: "Business Card Quantity Calculator - Cards & Boxes Needed | ToolZoneX",
    ogDescription: "Calculate total business cards and boxes needed from employee count and cards per person.",
    schemaName: "Business Card Quantity Calculator",
    schemaDescription: "Calculate total business cards needed as employees times cards per person times one plus buffer percentage, then boxes needed by rounding up against cards per box.",
    applicationCategory: "UtilityApplication",
    currency: undefined,
    faqs: [{ question: "Why include a reorder buffer at all?", answer: "Business cards get lost, damaged in transit, misprinted, or handed out faster than expected around events and conferences — a small buffer (commonly 10-20%) avoids running out and needing a rushed, more expensive small reorder." }, { question: "How many cards should each person get?", answer: "It depends on role and how often someone networks — 250 cards is a common standard default order size that lasts many people a long time, while sales or business development roles that attend frequent events may want more." }, { question: "Should every employee order the same quantity?", answer: "Not necessarily — this calculator assumes a uniform quantity per person for a simple bulk estimate. If your team has very different card usage needs, calculate high-usage roles separately and add the totals together." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
