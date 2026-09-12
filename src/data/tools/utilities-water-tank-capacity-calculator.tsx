import LocalDrinkIcon from '@mui/icons-material/LocalDrink';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/water-tank-capacity-calculator",
    navName: "Water Tank Capacity Calculator",
    navDescription: "Estimate tank volume, capacity & water weight.",
    name: "Water Tank Capacity Calculator",
    description: "Calculate the volume and capacity of a cylindrical or rectangular water tank in m³, liters, and US gallons, plus water weight and household supply duration.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <LocalDrinkIcon fontSize="large" color="primary"/>,
    seoTitle: "Water Tank Capacity Calculator - Volume, Liters & Water Weight",
    seoDescription: "Free water tank capacity calculator. Find tank volume in cubic meters, liters, and US gallons for cylindrical or rectangular tanks, with water weight and household supply estimates.",
    keywords: ["water tank capacity calculator", "water tank volume calculator", "tank liters calculator", "water tank size calculator", "tank volume gallons", "water tank weight", "how many liters in my tank"],
    ogTitle: "Water Tank Capacity Calculator - Volume & Water Weight | ToolZoneX",
    ogDescription: "Calculate water tank volume and capacity plus water weight and household supply duration.",
    schemaName: "Water Tank Capacity Calculator",
    schemaDescription: "Calculate water tank volume and capacity in m³, liters, and US gallons, with water weight and supply duration.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "How much water does a person use per day?", answer: "Across drinking, cooking, bathing, and flushing, the average is roughly 100–200 liters per person per day. This calculator defaults to 150 L but lets you adjust it to match your household." }, { question: "How heavy is a full water tank?", answer: "Since 1 liter of water weighs about 1 kg, a 1,000-liter tank holds roughly 1,000 kg (about 2,205 lb) of water. Remember to account for the tank's own weight and check your roof or stand's load capacity." }, { question: "Does shape affect capacity?", answer: "Capacity depends on volume, not shape — a cylindrical and rectangular tank with the same volume hold the same amount of water. Shape mainly affects footprint, surface area, and structural design." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
