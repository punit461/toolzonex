import ConstructionIcon from '@mui/icons-material/Construction';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/gravel-calculator",
    navName: "Gravel Calculator",
    navDescription: "Calculate gravel volume & weight needed.",
    name: "Gravel Calculator",
    description: "Calculate the volume and estimated weight of gravel needed to cover an area to a given depth.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <ConstructionIcon fontSize="large" color="primary"/>,
    seoTitle: "Gravel Calculator - How Much Gravel Do You Need?",
    seoDescription: "Free gravel calculator. Enter length, width, and depth to find the volume of gravel needed in cubic feet, yards, or meters, plus estimated weight.",
    keywords: ["gravel calculator", "how much gravel do i need", "gravel volume calculator", "gravel weight calculator", "driveway gravel calculator"],
    ogTitle: "Gravel Calculator - How Much Gravel Do You Need? | ToolZoneX",
    ogDescription: "Calculate the volume and weight of gravel needed for your project.",
    schemaName: "Gravel Calculator",
    schemaDescription: "Calculate the volume and estimated weight of gravel needed to cover an area to a given depth.",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: [{ question: "Does gravel density vary by type?", answer: "Yes — crushed stone, pea gravel, and river rock all pack and weigh differently depending on particle size, shape, and moisture content, typically somewhere in the 95-115 lb/ft³ (1,500-1,800 kg/m³) range. Adjust the density field above if your supplier gives you a specific figure for your gravel type." }, { question: "Should I buy extra gravel?", answer: "It's common practice to add 5-10% extra to account for compaction, uneven ground, and spillage during handling, especially for larger driveway or path projects." }, { question: "How do I convert cubic feet to bags of gravel?", answer: "Bag sizes vary by brand, but a common 0.5 cubic foot bag is a widely sold size. Divide your total cubic feet by the coverage per bag listed on your chosen product to estimate how many bags to buy." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
