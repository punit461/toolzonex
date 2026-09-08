import GridOnIcon from '@mui/icons-material/GridOn';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/minecraft-circle-calculator",
    navName: "Minecraft Circle Calculator",
    navDescription: "Block-by-block circle outlines to build.",
    name: "Minecraft Circle Calculator",
    description: "Generate a gap-free block circle outline for any diameter using the midpoint circle algorithm, with a visual block grid to follow in-game.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <GridOnIcon fontSize="large" color="primary"/>,
    seoTitle: "Minecraft Circle Calculator - Block Circle Generator",
    seoDescription: "Free Minecraft circle calculator. Enter a diameter to get an exact, gap-free block-by-block circle outline using the midpoint circle algorithm.",
    keywords: ["minecraft circle calculator", "minecraft circle generator", "minecraft circle chart", "block circle calculator", "minecraft building tool"],
    ogTitle: "Minecraft Circle Calculator - Block Circle Generator | ToolZoneX",
    ogDescription: "Generate a gap-free block circle outline for any diameter with a visual grid.",
    schemaName: "Minecraft Circle Calculator",
    schemaDescription: "Generate a gap-free block circle outline for a given diameter using the midpoint circle algorithm, rendered as a visual block grid.",
    applicationCategory: "UtilityApplication",
    currency: undefined,
    faqs: [{ question: "Why not just use Math.round(radius x sin/cos) for each angle?", answer: "That naive approach samples the circle at fixed angle steps and rounds each point independently, which frequently produces small gaps or duplicate blocks in the outline where the rounding jumps unevenly. The midpoint algorithm instead walks pixel-by-pixel and mathematically guarantees a continuous 8-way symmetric outline with no gaps." }, { question: "Why is the diameter capped at 50 blocks?", answer: "Larger circles produce a much bigger grid to render in the browser, and in practice most in-game circular builds (towers, rings, pools) fall well within this range — for bigger builds, calculate and place several concentric rings." }, { question: "Does this work for building spheres too?", answer: "Not directly — a sphere is built from multiple circles of different radii stacked and layered vertically. You can use this calculator to generate the outline for each individual horizontal ring of a sphere at its corresponding radius." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
