import WhatshotIcon from '@mui/icons-material/Whatshot';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/water-heating-cost-calculator",
    navName: "Water Heating Cost Calculator",
    navDescription: "Daily, monthly, and annual water heating cost.",
    name: "Water Heating Cost Calculator",
    description: "Calculate the cost of heating water from gallons used, temperature rise, and electric or gas energy price.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <WhatshotIcon fontSize="large" color="primary"/>,
    seoTitle: "Water Heating Cost Calculator - Daily & Monthly Cost",
    seoDescription: "Free water heating cost calculator. Enter gallons used, temperature rise, and electric or gas rate to calculate heating cost.",
    keywords: ["water heating cost calculator", "cost to heat water calculator", "hot water heater cost calculator", "water heater energy cost calculator", "btu water heating calculator"],
    ogTitle: "Water Heating Cost Calculator - Daily & Monthly Cost | ToolZoneX",
    ogDescription: "Calculate the cost of heating water from gallons used, temperature rise, and electric or gas energy price.",
    schemaName: "Water Heating Cost Calculator",
    schemaDescription: "Calculate energy needed in BTU from gallons, specific heat of water, and temperature rise, then convert to cost using electric or gas energy pricing.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "Does this account for water heater efficiency losses?", answer: "No — this calculates the theoretical energy needed to raise the water temperature. Real water heaters have some standby and conversion losses (heat lost through the tank, pilot lights, etc.), so actual costs are typically somewhat higher than this baseline figure." }, { question: "How do I find my incoming cold water temperature?", answer: "It varies by location and season — groundwater temperature commonly ranges from around 40°F in colder climates and winter months to 70°F or more in warmer regions and summer. Check with your local utility or use a thermometer on your cold tap for an accurate reading." }, { question: "Would lowering my water heater's temperature save money?", answer: "Yes — reducing the target temperature lowers the temperature rise needed, which directly reduces energy use. Many water heaters are set higher than necessary; many manufacturers suggest 120°F is sufficient for most households while also reducing scald risk." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
