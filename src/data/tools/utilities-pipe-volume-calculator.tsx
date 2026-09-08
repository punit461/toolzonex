import LocalDrinkIcon from '@mui/icons-material/LocalDrink';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/pipe-volume-calculator",
    navName: "Pipe Volume Calculator",
    navDescription: "Find water volume inside a pipe.",
    name: "Pipe Volume Calculator",
    description: "Calculate the volume of liquid a pipe can hold. Free online pipe volume calculator using inner diameter and length.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <LocalDrinkIcon fontSize="large" color="primary"/>,
    seoTitle: "Pipe Volume Calculator - Liters & Gallons Inside a Pipe",
    seoDescription: "Free online pipe volume calculator. Enter the inner diameter and length to get the volume in liters, gallons, cubic feet, and cubic meters.",
    keywords: ["pipe volume calculator", "water volume in pipe", "pipe capacity calculator", "volume of a pipe", "liters in pipe", "pipe water volume"],
    ogTitle: "Pipe Volume Calculator - Capacity in Liters & Gallons | ToolZoneX",
    ogDescription: "Find out how much liquid your pipe can hold, in liters, gallons, and cubic feet.",
    schemaName: "Pipe Volume Calculator",
    schemaDescription: "Calculate the volume of liquid a pipe can hold from its inner diameter and length.",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: [{ question: "Should I use inner or outer diameter?", answer: "Use the inner diameter — that is the dimension that actually contains the liquid. Using the outer diameter would overstate the capacity by the wall thickness." }, { question: "How is pipe volume calculated?", answer: "The pipe is treated as a cylinder: V = π × (inner radius)² × length. The calculator converts the length unit to the same system as the diameter before computing." }, { question: "Why is this useful?", answer: "Plumbers and engineers use it to size pipes, estimate water-chemical dosing, calculate flushing volume, and design heat-transfer loops." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
