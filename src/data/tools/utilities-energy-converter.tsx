import BoltIcon from '@mui/icons-material/Bolt';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/energy-converter",
    navName: "Energy Converter",
    navDescription: "Convert Joules, Calories, kWh, BTU & more.",
    name: "Energy Converter - Joules, Calories, kWh, BTU & More",
    description: "Convert energy values between Joules, Calories, Kilocalories, Watt-hours, Kilowatt-hours, BTU, and foot-pounds.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <BoltIcon fontSize="large" color="primary"/>,
    seoTitle: "Energy Converter - Joules, Calories, kWh, BTU & More",
    seoDescription: "Free energy converter. Convert between Joules, Calories, Kilocalories, Watt-hours, Kilowatt-hours, BTU, and foot-pounds instantly.",
    keywords: ["energy converter", "joules to calories", "kwh to joules", "btu converter", "energy unit converter"],
    ogTitle: "Energy Converter - Joules, Calories, kWh, BTU & More | ToolZoneX",
    ogDescription: "Convert between Joules, Calories, kWh, BTU, and more energy units.",
    schemaName: "Energy Converter",
    schemaDescription: "Convert energy values between Joules, Calories, Kilocalories, Watt-hours, Kilowatt-hours, BTU, and foot-pounds.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "What's the difference between a calorie and a Calorie?", answer: "A lowercase \"calorie\" (small calorie) is the energy needed to raise 1 gram of water by 1°C. The \"Calorie\" used on nutrition labels is actually a kilocalorie — 1,000 small calories — which is why this converter lists Kilocalories/Food Calories (kcal) as the nutrition-label unit." }, { question: "Why is a BTU not a round number of joules?", answer: "The BTU (British Thermal Unit) was originally defined as the energy to raise 1 pound of water by 1°F — an imperial-unit definition that doesn't translate to a clean round number in the metric, joule-based system, hence the 1,055.06 conversion factor." }, { question: "How accurate are these conversion factors?", answer: "The factors used (for example, 1 kWh = 3,600,000 J exactly, and 1 cal = 4.184 J) are standard, internationally recognized values, so results are accurate to the number of decimal places shown." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
