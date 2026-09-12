import EngineeringIcon from '@mui/icons-material/Engineering';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/column-load-calculator",
    navName: "Column Load Calculator",
    navDescription: "Simplified structural load estimate for a column.",
    name: "Column Load Calculator - Tributary Area Load Estimate",
    description: "Estimate the total load carried by a column from its tributary area and load per unit area. Simplified reference estimate only.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <EngineeringIcon fontSize="large" color="primary"/>,
    seoTitle: "Column Load Calculator - Tributary Area Load Estimate",
    seoDescription: "Free column load calculator. Enter tributary area and load per square foot to estimate the total load on a column. Simplified reference estimate only.",
    keywords: ["column load calculator", "tributary area calculator", "structural load calculator", "column load estimate", "psf load calculator"],
    ogTitle: "Column Load Calculator - Tributary Area Load Estimate | ToolZoneX",
    ogDescription: "Estimate the total load carried by a column from its tributary area and load per unit area.",
    schemaName: "Column Load Calculator",
    schemaDescription: "Estimate total column load from tributary area (length times width) and load per unit area, for reference/educational purposes only.",
    applicationCategory: "UtilityApplication",
    currency: undefined,
    faqs: [{ question: "Is this safe to use for an actual construction project?", answer: "No. This calculator provides a simplified estimate for reference and educational purposes only. Real structural design must account for local building codes, snow/wind/seismic loads, load factors and safety margins, material properties, and column-specific engineering — always have a licensed structural engineer review and calculate loads for any real construction project." }, { question: "What is tributary area?", answer: "Tributary area is the portion of a floor or roof whose weight is assumed to be carried by a specific column or support, typically found by taking half the span to each adjacent support in both directions and multiplying those distances together." }, { question: "What's the difference between live load and dead load?", answer: "Dead load is the permanent weight of the structure itself (framing, flooring, walls). Live load is temporary or variable weight (people, furniture, movable equipment, snow). The presets in this calculator combine typical values for both into a single number for simplicity." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
