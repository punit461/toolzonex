import GrainIcon from '@mui/icons-material/Grain';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/sand-calculator",
    navName: "Sand Calculator",
    navDescription: "Estimate sand volume & weight needed.",
    name: "Sand Calculator - Estimate Sand Volume & Weight",
    description: "Calculate how much sand you need for an area and depth, in cubic feet, cubic yards, or cubic meters, with estimated weight.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <GrainIcon fontSize="large" color="primary"/>,
    seoTitle: "Sand Calculator - Estimate Sand Volume & Weight",
    seoDescription: "Free online sand calculator. Enter length, width, and depth to estimate cubic feet, cubic yards, or cubic meters of sand needed, plus weight.",
    keywords: ["sand calculator", "how much sand do i need", "sand volume calculator", "sandbox sand calculator", "sand weight calculator"],
    ogTitle: "Sand Calculator - Estimate Sand Volume & Weight | ToolZoneX",
    ogDescription: "Calculate how much sand you need for your project, with weight estimate.",
    schemaName: "Sand Calculator",
    schemaDescription: "Calculate sand volume needed for an area and depth, with estimated weight.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "Does sand density vary?", answer: "Yes — sand density varies with moisture content, grain size, and compaction. Dry, loose sand is close to 100 lb/ft³ (1,600 kg/m³), but wet or compacted sand can weigh 10-20% more. Treat the weight estimate here as a planning guide rather than an exact figure." }, { question: "Should I buy extra sand?", answer: "It's common practice to add 5-10% extra to account for compaction, uneven ground, and spillage during handling, especially for larger projects." }, { question: "How do I convert cubic feet to bags of sand?", answer: "Bag sizes vary by brand, but a common 50 lb bag covers roughly 0.5 cubic feet. Divide your total cubic feet by the coverage per bag listed on your chosen product to estimate how many bags to buy." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
