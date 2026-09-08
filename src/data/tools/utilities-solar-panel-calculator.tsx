import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/solar-panel-calculator",
    navName: "Solar Panel Calculator",
    navDescription: "Estimate solar panels needed for your home.",
    name: "Solar Panel Calculator",
    description: "Calculate how many solar panels you need based on daily electricity usage, panel wattage, peak sun hours, and system efficiency.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <ElectricBoltIcon fontSize="large" color="primary"/>,
    seoTitle: "Solar Panel Calculator - How Many Panels Do You Need?",
    seoDescription: "Free solar panel calculator to estimate how many panels your home needs. Enter usage, wattage, and sun hours for instant results.",
    keywords: ["solar panel calculator", "how many solar panels do i need", "solar system size calculator", "solar energy calculator"],
    ogTitle: "Solar Panel Calculator - Estimate Your Solar Needs | ToolZoneX",
    ogDescription: "Calculate how many solar panels you need based on your electricity usage.",
    schemaName: "Solar Panel Calculator",
    schemaDescription: "Calculate how many solar panels you need based on daily electricity usage, panel wattage, peak sun hours, and system efficiency.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "What are peak sun hours?", answer: "Peak sun hours represent hours per day when solar irradiance averages 1,000 W/m². This varies by location and season." }, { question: "Why is efficiency less than 100%?", answer: "Real-world losses come from inverter inefficiency, wiring, temperature effects, soiling, and shading. 80–90% is typical." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
