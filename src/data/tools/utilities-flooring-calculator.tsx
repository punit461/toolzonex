import LayersIcon from '@mui/icons-material/Layers';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/flooring-calculator",
    navName: "Flooring Calculator",
    navDescription: "Number of flooring boxes needed for a room.",
    name: "Flooring Calculator - How Many Boxes Do I Need",
    description: "Calculate the number of flooring boxes needed for a room from room area, box coverage rate, and a waste allowance.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <LayersIcon fontSize="large" color="primary"/>,
    seoTitle: "Flooring Calculator - How Many Boxes Do I Need",
    seoDescription: "Free flooring calculator. Enter room dimensions, box coverage rate, and waste percentage to find how many boxes of flooring to buy.",
    keywords: ["flooring calculator", "how many boxes of flooring do i need", "laminate flooring calculator", "vinyl plank flooring calculator", "flooring boxes calculator"],
    ogTitle: "Flooring Calculator - How Many Boxes Do I Need | ToolZoneX",
    ogDescription: "Calculate how many boxes of flooring you need for your room.",
    schemaName: "Flooring Calculator",
    schemaDescription: "Calculate the number of flooring boxes needed for a room from room area, box coverage rate, and a waste allowance.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "Where do I find the coverage per box?", answer: "It's printed directly on the flooring box (often listed in sq ft or m²), or available on the product page from the retailer or manufacturer. Coverage varies by plank size and packaging, so always check the specific product you're buying." }, { question: "Why is 10% waste the default?", answer: "10% is a common baseline for straightforward rectangular rooms. Rooms with lots of corners, closets, or diagonal installation patterns typically need 15% or more to account for extra cuts and offcuts that can't be reused." }, { question: "How is this different from a tile calculator?", answer: "Tile calculators typically work per individual tile using its exact length and width. This calculator instead works per box, since flooring like laminate and vinyl plank is purchased and priced by box-coverage area rather than by counting individual planks." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
