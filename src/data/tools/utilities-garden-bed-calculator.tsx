import YardIcon from '@mui/icons-material/Yard';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/garden-bed-calculator",
    navName: "Garden Bed Calculator",
    navDescription: "How many beds fit in your garden plot.",
    name: "Garden Bed Calculator",
    description: "Calculate how many garden beds fit across an available plot, plus total planting area and path area, from plot size, bed width, and path width.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <YardIcon fontSize="large" color="primary"/>,
    seoTitle: "Garden Bed Calculator - Bed Layout & Planting Area",
    seoDescription: "Free garden bed calculator. Enter plot size, bed width, and path width to calculate how many beds fit and total planting area.",
    keywords: ["garden bed calculator", "garden bed layout calculator", "how many raised beds fit calculator", "garden plot planner calculator", "raised bed planning calculator"],
    ogTitle: "Garden Bed Calculator - Bed Layout & Planting Area | ToolZoneX",
    ogDescription: "Calculate how many garden beds fit across an available plot, plus total planting and path area.",
    schemaName: "Garden Bed Calculator",
    schemaDescription: "Calculate the number of beds that fit across a plot as plot width divided by bed width plus path width, then compute total planting and path area.",
    applicationCategory: "UtilityApplication",
    currency: undefined,
    faqs: [{ question: "How is this different from the Garden Soil Calculator?", answer: "The Garden Soil Calculator computes the volume of soil needed to fill a bed that's already a known size. This tool comes earlier in the planning process — it helps you figure out how many beds actually fit in your available garden space in the first place." }, { question: "How wide should garden paths be?", answer: "Paths need to be wide enough to comfortably walk, kneel, and maneuver a wheelbarrow through — 18-24 inches is a common minimum, while 2-3 feet is more comfortable for wheelbarrow access and accessibility." }, { question: "Why not just make one giant bed instead of several smaller ones?", answer: "Narrower beds (commonly 3-4 feet wide) let you reach the center from either side without stepping on and compacting the soil, which is important for root growth and soil health — a single very wide bed makes the middle hard to reach." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
