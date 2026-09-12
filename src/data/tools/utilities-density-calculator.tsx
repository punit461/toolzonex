import ScaleIcon from '@mui/icons-material/Scale';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/density-calculator",
    navName: "Density Calculator",
    navDescription: "Find density, mass or volume + material match.",
    name: "Density Calculator",
    description: "Calculate density from mass and volume, or solve for mass or volume. Shows results in kg/m³ and g/cm³ and compares against common materials.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <ScaleIcon fontSize="large" color="primary"/>,
    seoTitle: "Density Calculator - Density, Mass & Volume with Material Match",
    seoDescription: "Free density calculator. Compute density, mass, or volume in kg/m³ and g/cm³, and see which common material (water, iron, aluminum, gold) your result is closest to.",
    keywords: ["density calculator", "density mass volume", "mass calculator", "volume calculator", "density formula", "g per cm3", "kg per m3", "material density"],
    ogTitle: "Density Calculator - Density, Mass & Volume with Material Match | ToolZoneX",
    ogDescription: "Compute density, mass, or volume in kg/m³ and g/cm³ and compare against common materials.",
    schemaName: "Density Calculator",
    schemaDescription: "Calculate density, mass, or volume and compare against common materials.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "How do I convert kg/m³ to g/cm³?", answer: "Divide by 1000. Since 1 kg = 1000 g and 1 m³ = 1,000,000 cm³, a density of 1000 kg/m³ equals 1 g/cm³. The calculator shows both." }, { question: "Does temperature affect density?", answer: "Yes — most materials expand when heated, lowering density. Water is a notable exception between 0°C and 4°C. Values here are typical room-temperature densities." }, { question: "How can I tell what material something is?", answer: "Measure mass and volume, compute density, then compare to the reference table — the calculator flags the closest common material." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
