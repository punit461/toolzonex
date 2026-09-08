import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/unit-converter",
    navName: "Unit Converter",
    navDescription: "Length, weight, temperature, area, volume, speed & time.",
    name: "Unit Converter",
    description: "Convert between units of Length, Weight/Mass, Temperature, Area, Volume, Speed, and Time in one combined converter.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <SwapHorizIcon fontSize="large" color="primary"/>,
    seoTitle: "Unit Converter - Length, Weight, Temperature & More",
    seoDescription: "Free all-in-one unit converter for Length, Weight/Mass, Temperature, Area, Volume, Speed, and Time. Instant, accurate conversions between common units.",
    keywords: ["unit converter", "measurement converter", "metric to imperial converter", "length converter", "weight converter", "temperature converter", "speed converter"],
    ogTitle: "Unit Converter - Length, Weight, Temperature & More | ToolZoneX",
    ogDescription: "Convert between units of Length, Weight/Mass, Temperature, Area, Volume, Speed, and Time.",
    schemaName: "Unit Converter",
    schemaDescription: "Convert between units of Length, Weight/Mass, Temperature, Area, Volume, Speed, and Time.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "Why does temperature need special formulas instead of a simple factor?", answer: "Celsius, Fahrenheit, and Kelvin scales don't share a common zero point, so converting between them requires both a multiplication and an addition or subtraction step (like °F = °C × 9/5 + 32), unlike length or weight, which convert with a single multiplication factor." }, { question: "How accurate are the conversion factors used?", answer: "The conversion factors used (for example, 1 inch = 2.54 cm exactly, and 1 pound = 453.59237 grams exactly) are the internationally defined standard values, so results are accurate to the precision shown." }, { question: "Why do the unit options change when I switch category?", answer: "Each category — Length, Weight, Temperature, Area, Volume, Speed, and Time — has its own set of relevant units, so switching category automatically resets the \"from\" and \"to\" dropdowns to a sensible pair of units for that category." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
