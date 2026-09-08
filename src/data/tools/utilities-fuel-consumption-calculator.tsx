import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/fuel-consumption-calculator",
    navName: "Fuel Consumption Calculator",
    navDescription: "Convert MPG, L/100km & km/L.",
    name: "Fuel Consumption Calculator - MPG, L/100km & km/L",
    description: "Calculate fuel consumption from distance and fuel used, shown in MPG (US & UK), L/100km, and km/L simultaneously.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <LocalGasStationIcon fontSize="large" color="primary"/>,
    seoTitle: "Fuel Consumption Calculator - MPG, L/100km & km/L",
    seoDescription: "Free online fuel consumption calculator. Enter distance and fuel used to get MPG (US & UK), liters per 100km, and km per liter instantly.",
    keywords: ["fuel consumption calculator", "mpg calculator", "l/100km calculator", "km per liter calculator", "fuel economy calculator"],
    ogTitle: "Fuel Consumption Calculator - MPG, L/100km & km/L | ToolZoneX",
    ogDescription: "Calculate fuel consumption in MPG, L/100km, and km/L at once.",
    schemaName: "Fuel Consumption Calculator",
    schemaDescription: "Calculate fuel consumption from distance and fuel used, shown in MPG, L/100km, and km/L.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "Why is UK mpg higher than US mpg for the same car?", answer: "A US gallon (3.785 liters) is smaller than a UK/imperial gallon (4.546 liters). Since mpg is distance per gallon, using the larger UK gallon in the calculation produces a higher mpg number for the exact same real-world fuel economy." }, { question: "Is a higher or lower L/100km number better?", answer: "Lower is better for L/100km, since it means less fuel is used to cover the same distance. This is the opposite of mpg or km/L, where a higher number means better fuel economy." }, { question: "How accurate is my own calculated fuel economy?", answer: "Real-world figures depend on driving style, terrain, load, and how precisely you measure the fuel added at each fill-up. Averaging results over several tanks of fuel gives a more reliable figure than a single measurement." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
