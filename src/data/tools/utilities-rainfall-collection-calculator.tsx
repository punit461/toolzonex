import OpacityIcon from '@mui/icons-material/Opacity';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/rainfall-collection-calculator",
    navName: "Rainfall Collection Calculator",
    navDescription: "Gallons harvested from roof area and rainfall.",
    name: "Rainfall Collection Calculator",
    description: "Estimate gallons of rainwater collected from roof catchment area, rainfall amount, and collection efficiency.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <OpacityIcon fontSize="large" color="primary"/>,
    seoTitle: "Rainfall Collection Calculator - Rain Barrel Harvest Estimate",
    seoDescription: "Free rainfall collection calculator. Enter roof area and rainfall amount to calculate gallons of rainwater you could harvest.",
    keywords: ["rainfall collection calculator", "rain barrel calculator", "rainwater harvesting calculator", "how much rain can i collect", "roof rainwater collection calculator"],
    ogTitle: "Rainfall Collection Calculator - Rain Barrel Harvest Estimate | ToolZoneX",
    ogDescription: "Estimate gallons of rainwater collected from roof catchment area, rainfall amount, and collection efficiency.",
    schemaName: "Rainfall Collection Calculator",
    schemaDescription: "Calculate gallons collected as roof area times rainfall in inches times 0.623, adjusted by a collection efficiency percentage.",
    applicationCategory: "UtilityApplication",
    currency: undefined,
    faqs: [{ question: "Where does the 0.623 conversion factor come from?", answer: "One inch of rain falling on one square foot of surface equals 0.623 gallons of water — it's a standard conversion used throughout rainwater harvesting calculations based on the volume of a one-inch-deep layer of water over one square foot." }, { question: "Why isn't collection efficiency 100%?", answer: "Real systems lose some water to gutter overflow during heavy rain, evaporation, splashing, debris blockage, and first-flush diverters that intentionally discard the initial runoff carrying roof debris and contaminants. 80-90% is a commonly used realistic range." }, { question: "Does roof material affect how much I can collect?", answer: "Yes — smooth, non-porous materials like metal roofing collect more efficiently than porous materials like some shingles or wood shakes, which absorb a small amount of water before runoff begins." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
