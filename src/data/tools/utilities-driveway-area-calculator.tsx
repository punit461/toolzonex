import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/driveway-area-calculator",
    navName: "Driveway Area Calculator",
    navDescription: "Driveway area, including a second section.",
    name: "Driveway Area Calculator",
    description: "Calculate driveway area in square feet and square yards from length and width, with support for an optional second rectangular section.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <DirectionsCarIcon fontSize="large" color="primary"/>,
    seoTitle: "Driveway Area Calculator - Square Feet & Square Yards",
    seoDescription: "Free driveway area calculator. Enter length and width (plus an optional second section) to calculate driveway area in square feet and square yards.",
    keywords: ["driveway area calculator", "driveway square footage calculator", "how big is my driveway", "driveway size calculator", "l shaped driveway calculator"],
    ogTitle: "Driveway Area Calculator - Square Feet & Square Yards | ToolZoneX",
    ogDescription: "Calculate driveway area in square feet and square yards, including an optional second section.",
    schemaName: "Driveway Area Calculator",
    schemaDescription: "Calculate driveway area as length times width per section, summed across sections, shown in square feet and square yards.",
    applicationCategory: "UtilityApplication",
    currency: undefined,
    faqs: [{ question: "Does this calculate paving or concrete cost?", answer: "No — this tool calculates area only, in both square feet and square yards. Square yardage is commonly used when requesting quotes for paving, concrete, or asphalt materials, so having both figures on hand makes it easier to get an accurate cost estimate from a contractor." }, { question: "What if my driveway has more than two sections?", answer: "Calculate any additional rectangular sections separately (length × width) and add their area to the total shown here manually." }, { question: "How do I handle a curved or irregular edge?", answer: "Approximate the curved area as a rectangle using its average width, or break it into smaller rectangular sections and add them together — for most driveway estimates, a reasonable rectangular approximation is accurate enough." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
