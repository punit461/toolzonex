import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/insulation-calculator",
    navName: "Insulation Calculator",
    navDescription: "Insulation needed for a target R-value.",
    name: "Insulation Calculator",
    description: "Calculate how much insulation you need, expressed as square footage of a given R-value batt or roll product.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <DeviceThermostatIcon fontSize="large" color="primary"/>,
    seoTitle: "Insulation Calculator - How Much Insulation You Need",
    seoDescription: "Free insulation calculator. Enter area and target R-value to find how many square feet of insulation to buy.",
    keywords: ["insulation calculator", "how much insulation do i need", "attic insulation calculator", "r-value calculator", "insulation square footage calculator"],
    ogTitle: "Insulation Calculator - How Much Insulation You Need | ToolZoneX",
    ogDescription: "Calculate how much insulation you need for a target R-value.",
    schemaName: "Insulation Calculator",
    schemaDescription: "Calculate insulation needed as square footage of a given R-value from area to insulate.",
    applicationCategory: "UtilityApplication",
    currency: undefined,
    faqs: [{ question: "What R-value should I target?", answer: "Recommended R-values vary by climate zone and the part of the home — attics in colder climates often target R-38 to R-60, while walls commonly use R-13 to R-21. Check your local building code or an energy guide for your specific climate zone and application." }, { question: "Can I mix R-values or add a second layer on top of existing insulation?", answer: "Yes — R-values add together, so laying a new batt over existing attic insulation increases the combined R-value. Calculate the additional area you're covering and the R-value of the new layer separately from what's already there." }, { question: "Why does this use square footage instead of volume or thickness?", answer: "Batt and roll insulation products are manufactured and sold at a fixed thickness for a given R-value, so the amount you need to buy is simply the area you're covering — thickness is already baked into the product you choose, not something you calculate separately." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
