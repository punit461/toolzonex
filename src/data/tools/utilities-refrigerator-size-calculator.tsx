import KitchenIcon from '@mui/icons-material/Kitchen';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/refrigerator-size-calculator",
    navName: "Refrigerator Size Calculator",
    navDescription: "Recommended fridge capacity by household size.",
    name: "Refrigerator Size Calculator",
    description: "Get a recommended refrigerator capacity in cubic feet based on the number of people in your household.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <KitchenIcon fontSize="large" color="primary"/>,
    seoTitle: "Refrigerator Size Calculator - Recommended Fridge Capacity",
    seoDescription: "Free refrigerator size calculator. Enter household size to get a recommended refrigerator capacity in cubic feet.",
    keywords: ["refrigerator size calculator", "what size refrigerator do i need", "fridge capacity calculator", "refrigerator cubic feet calculator", "refrigerator size guide"],
    ogTitle: "Refrigerator Size Calculator - Recommended Fridge Capacity | ToolZoneX",
    ogDescription: "Get a recommended refrigerator capacity based on the number of people in your household.",
    schemaName: "Refrigerator Size Calculator",
    schemaDescription: "Get a recommended refrigerator capacity in cubic feet based on the number of people in your household.",
    applicationCategory: "UtilityApplication",
    currency: undefined,
    faqs: [{ question: "Is this rule of thumb exact?", answer: "No — it's a general starting guideline. Households that cook a lot from scratch, buy groceries in bulk, or store a lot of leftovers may want more capacity, while households that eat out often or shop frequently in small trips may be comfortable with less." }, { question: "Does refrigerator capacity include the freezer?", answer: "Manufacturer-listed total capacity typically includes both the fresh food and freezer compartments combined, so keep that in mind when comparing this recommendation to a specific model's listed capacity." }, { question: "Should I round up or down when between sizes?", answer: "Rounding up is usually the safer choice — running out of space is a daily annoyance, while a slightly larger fridge mostly just costs a bit more to run and buy." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
