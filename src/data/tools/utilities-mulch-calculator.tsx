import GrainIcon from '@mui/icons-material/Grain';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/mulch-calculator",
    navName: "Mulch Calculator",
    navDescription: "Estimate mulch volume & bag count.",
    name: "Mulch Calculator",
    description: "Calculate how much mulch you need for a garden bed based on area and depth, with a bag-count estimate.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <GrainIcon fontSize="large" color="primary"/>,
    seoTitle: "Mulch Calculator - How Much Mulch Do I Need?",
    seoDescription: "Free mulch calculator. Enter your area and desired mulch depth to calculate cubic feet, cubic yards, and how many bags of mulch you need.",
    keywords: ["mulch calculator", "how much mulch do i need", "mulch bags calculator", "mulch cubic yards calculator", "garden mulch calculator"],
    ogTitle: "Mulch Calculator - How Much Mulch Do I Need? | ToolZoneX",
    ogDescription: "Calculate how much mulch you need for your garden bed.",
    schemaName: "Mulch Calculator",
    schemaDescription: "Calculate the volume of mulch needed to cover a given area at a given depth, with a bag-count estimate.",
    applicationCategory: "UtilityApplication",
    currency: undefined,
    faqs: [{ question: "How deep should I apply mulch?", answer: "A depth of 2-4 inches is typical for most garden beds — enough to suppress weeds and retain soil moisture without smothering plant roots. Avoid piling mulch directly against tree trunks or plant stems." }, { question: "Is it cheaper to buy mulch in bulk or in bags?", answer: "Bulk mulch (sold by the cubic yard) is almost always cheaper per unit volume than bagged mulch once you need more than a couple of cubic yards, though bagged mulch is more convenient for small areas or if you don't have a way to haul loose material." }, { question: "Does mulch need to be replaced every year?", answer: "Organic mulch breaks down over time and typically needs topping up annually or every couple of years, depending on the material — wood chips and bark last longer than finer mulches like shredded leaves or straw." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
