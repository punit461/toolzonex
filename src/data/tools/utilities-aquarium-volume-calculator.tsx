import WavesIcon from '@mui/icons-material/Waves';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/aquarium-volume-calculator",
    navName: "Aquarium Volume Calculator",
    navDescription: "Calculate tank volume in gallons or liters.",
    name: "Aquarium Volume Calculator - Tank Gallons & Liters",
    description: "Calculate rectangular aquarium volume in gallons or liters from tank dimensions, with estimated water weight.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <WavesIcon fontSize="large" color="primary"/>,
    seoTitle: "Aquarium Volume Calculator - Tank Gallons & Liters",
    seoDescription: "Free online aquarium volume calculator. Enter length, width, and height to get tank volume in gallons or liters, plus estimated water weight.",
    keywords: ["aquarium volume calculator", "fish tank volume calculator", "aquarium gallons calculator", "tank size calculator", "aquarium water weight"],
    ogTitle: "Aquarium Volume Calculator - Tank Gallons & Liters | ToolZoneX",
    ogDescription: "Calculate your aquarium's volume in gallons or liters instantly.",
    schemaName: "Aquarium Volume Calculator",
    schemaDescription: "Calculate rectangular aquarium volume in gallons or liters from tank dimensions, with estimated water weight.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "Why is my calculated volume different from the tank's advertised size?", answer: "Advertised sizes (like \"20 gallon\") are usually rounded to standard industry sizes and don't account for glass thickness reducing interior dimensions, so the calculated volume from exact measurements is often a close but not identical match." }, { question: "Should I use the full volume when calculating stocking levels?", answer: "No — substrate, decorations, and equipment displace some water, so the actual water volume is typically 5-10% less than the tank's full geometric volume. Many aquarists use the full volume as a conservative estimate for filtration sizing." }, { question: "Does this work for bowfront or cylindrical tanks?", answer: "This calculator is designed for standard rectangular tanks. Curved or cylindrical tanks require different volume formulas (based on a cylinder or a more complex curved-front shape) and will show a higher volume than the simple length × width × height calculation for the same footprint." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
