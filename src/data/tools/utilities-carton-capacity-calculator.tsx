import ViewInArIcon from '@mui/icons-material/ViewInAr';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/carton-capacity-calculator",
    navName: "Carton Capacity Calculator",
    navDescription: "How many items fit in a carton.",
    name: "Carton Capacity Calculator",
    description: "Calculate how many items fit inside a carton using a simple axis-aligned grid-packing approximation based on carton and item dimensions.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <ViewInArIcon fontSize="large" color="primary"/>,
    seoTitle: "Carton Capacity Calculator - Items per Carton",
    seoDescription: "Free carton capacity calculator. Enter carton and item dimensions to calculate how many items fit in a carton.",
    keywords: ["carton capacity calculator", "box packing calculator", "how many items fit in a box", "carton fill calculator", "packing calculator"],
    ogTitle: "Carton Capacity Calculator - Items per Carton | ToolZoneX",
    ogDescription: "Calculate how many items fit inside a carton based on carton and item dimensions.",
    schemaName: "Carton Capacity Calculator",
    schemaDescription: "Calculate items that fit in a carton as the floor of carton length divided by item length, times floor of width ratio, times floor of height ratio.",
    applicationCategory: "UtilityApplication",
    currency: undefined,
    faqs: [{ question: "Does this account for rotating items to fit more?", answer: "No — this uses a simple axis-aligned grid-packing approximation, where every item is assumed to sit in the same orientation. Real-world optimal packing can sometimes fit more items by rotating them or mixing orientations, so treat this result as a solid, conservative estimate rather than the absolute maximum." }, { question: "Should I use inside or outside carton dimensions?", answer: "Always use the carton's internal (inside) dimensions — the outside dimensions include the wall thickness of the cardboard, which would overstate how much usable space is actually available." }, { question: "Does this leave room for padding or filler?", answer: "No — it calculates the maximum items that fit based purely on dimensions. If you need to leave space for padding or filler material, reduce the carton's usable dimensions slightly before entering them." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
