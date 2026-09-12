import BoltIcon from '@mui/icons-material/Bolt';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/power-converter",
    navName: "Power Converter",
    navDescription: "Convert watts, horsepower, BTU/hr & more.",
    name: "Power Converter - Watts, Horsepower, BTU/hr & More",
    description: "Convert power between watts, kilowatts, megawatts, horsepower (mechanical & metric), BTU/hr, foot-pounds/min, and calories/sec.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <BoltIcon fontSize="large" color="primary"/>,
    seoTitle: "Power Converter - Watts, Horsepower, BTU/hr & More",
    seoDescription: "Free online power converter. Convert between watts, kilowatts, horsepower, BTU/hr, foot-pounds per minute, and calories per second instantly.",
    keywords: ["power converter", "watts to horsepower", "kw to hp calculator", "btu to watts calculator", "power unit conversion"],
    ogTitle: "Power Converter - Watts, Horsepower, BTU/hr & More | ToolZoneX",
    ogDescription: "Convert power between watts, horsepower, BTU/hr, and more instantly.",
    schemaName: "Power Converter",
    schemaDescription: "Convert power between watts, kilowatts, megawatts, horsepower, BTU/hr, foot-pounds/min, and calories/sec.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "What is the difference between mechanical and metric horsepower?", answer: "Mechanical horsepower (used in the US and UK) equals 745.699872 watts, while metric horsepower (PS, common in Europe) equals 735.49875 watts. They are close but not identical, so this converter treats them as separate units." }, { question: "Why is watts used as the base unit?", answer: "Watts is the SI unit of power, and every other unit here has a precisely defined conversion factor into watts. Converting everything to watts first, then out to each target unit, keeps the math consistent and avoids compounding rounding errors from unit-to-unit conversion tables." }, { question: "How accurate are these conversions?", answer: "The conversion factors used are the standard internationally recognized values (for example, 1 mechanical horsepower = 745.699872 W exactly), so results are accurate to the number of decimal places shown." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
