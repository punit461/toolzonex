import GrassIcon from '@mui/icons-material/Grass';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/garden-soil-calculator",
    navName: "Garden Soil Calculator",
    navDescription: "Soil volume needed for a garden bed.",
    name: "Garden Soil Calculator",
    description: "Calculate how much soil is needed to fill a garden bed from its length, width, and desired soil depth.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <GrassIcon fontSize="large" color="primary"/>,
    seoTitle: "Garden Soil Calculator - Soil Volume for Garden Beds",
    seoDescription: "Free garden soil calculator. Enter bed length, width, and depth to calculate cubic feet, cubic yards, and bags of soil needed.",
    keywords: ["garden soil calculator", "soil calculator for raised bed", "how much soil do i need", "garden bed soil calculator", "cubic feet of soil calculator"],
    ogTitle: "Garden Soil Calculator - Soil Volume for Garden Beds | ToolZoneX",
    ogDescription: "Calculate how much soil is needed to fill a garden bed by length, width, and depth.",
    schemaName: "Garden Soil Calculator",
    schemaDescription: "Calculate how much soil is needed to fill a garden bed from its length, width, and desired soil depth.",
    applicationCategory: "UtilityApplication",
    currency: undefined,
    faqs: [{ question: "Should I buy bagged soil or bulk soil?", answer: "For small volumes (typically under 1-2 cubic yards), bagged soil is usually more convenient. For larger beds or multiple beds, bulk soil delivered by the cubic yard is often significantly cheaper per cubic foot." }, { question: "How deep should garden soil be for vegetables?", answer: "Most vegetables do well with 8-12 inches of quality soil, though root vegetables like carrots benefit from deeper, looser soil, while shallow-rooted crops like lettuce can work with less." }, { question: "Does this account for soil settling over time?", answer: "No — this calculates the volume needed to fill the bed at your chosen depth right now. Soil naturally settles and compacts over the following weeks, so many gardeners add 10-15% extra or plan to top off the bed later." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
