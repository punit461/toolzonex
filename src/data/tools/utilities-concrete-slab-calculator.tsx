import StraightenIcon from '@mui/icons-material/Straighten';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/concrete-slab-calculator",
    navName: "Concrete Slab Calculator",
    navDescription: "Estimate concrete volume, bags & cost.",
    name: "Concrete Slab Calculator",
    description: "Calculate the concrete needed for a slab in cubic feet and cubic yards, with 80 lb bag count, wastage, and estimated cost.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <StraightenIcon fontSize="large" color="primary"/>,
    seoTitle: "Concrete Slab Calculator - Volume, Bags & Cost",
    seoDescription: "Free concrete slab calculator. Estimate cubic feet, cubic yards, 80 lb bags of concrete needed, and total cost with wastage for your slab project.",
    keywords: ["concrete slab calculator", "concrete calculator", "concrete volume calculator", "concrete bags needed", "concrete yard calculator", "how much concrete do i need", "80 lb bag concrete"],
    ogTitle: "Concrete Slab Calculator - Volume, Bags & Cost | ToolZoneX",
    ogDescription: "Calculate concrete volume, 80 lb bags needed, and cost for your slab.",
    schemaName: "Concrete Slab Calculator",
    schemaDescription: "Calculate concrete needed for a slab in cubic feet and cubic yards, with bag count and cost.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "How much does an 80 lb bag of concrete cover?", answer: "A standard 80 lb bag yields about 0.6 cubic feet of concrete. At 4 inches thick, one bag covers roughly 1.8 square feet, so a 10 ft × 8 ft slab needs around 49 bags." }, { question: "How much wastage should I add?", answer: "A 5–10% allowance is typical for small slabs. Add more for uneven ground, multiple pours, or complex shapes where seaming and spillage increase losses." }, { question: "What is a standard slab thickness?", answer: "Interior floors and small pads are often 4 inches thick, while driveways and heavier loads usually call for 5–6 inches. Always confirm against your local building code." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
