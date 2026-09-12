import LocalBarIcon from '@mui/icons-material/LocalBar';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/drink-quantity-calculator",
    navName: "Drink Quantity Calculator",
    navDescription: "Drinks needed for an event, plus bottle counts.",
    name: "Drink Quantity Calculator",
    description: "Calculate total drinks needed for an event from guest count, duration, and drinks per person per hour, with a breakdown into bottles and cans.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <LocalBarIcon fontSize="large" color="primary"/>,
    seoTitle: "Drink Quantity Calculator - Drinks Needed for a Party",
    seoDescription: "Free drink quantity calculator. Enter guests, event duration, and drinks per hour to calculate total drinks needed and bottle/can counts.",
    keywords: ["drink quantity calculator", "how many drinks per person for a party", "party drink calculator", "alcohol calculator for a party", "bar quantity calculator"],
    ogTitle: "Drink Quantity Calculator - Drinks Needed for a Party | ToolZoneX",
    ogDescription: "Calculate total drinks needed for an event and a breakdown into bottles and cans.",
    schemaName: "Drink Quantity Calculator",
    schemaDescription: "Calculate total drinks as guests times hours times drinks per person per hour, with drink-type percentages converted to bottles and cans.",
    applicationCategory: "UtilityApplication",
    currency: undefined,
    faqs: [{ question: "Why 1 drink per person per hour as a default?", answer: "It's a commonly used general event-planning estimate that accounts for guests who don't drink at all balancing out those who drink more, though you should adjust it up or down based on your specific crowd and event type." }, { question: "How many glasses are in a bottle of wine?", answer: "A standard 750ml bottle pours about 5 standard glasses (5 oz each), which is the figure used here to convert wine drinks into bottles needed." }, { question: "Do the drink-type percentages need to add up to 100%?", answer: "They should for the bottle/can breakdown to reflect your actual total — if they don't sum to 100%, each category is still calculated correctly as its own percentage of the total drinks, but the categories combined won't account for every drink." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
