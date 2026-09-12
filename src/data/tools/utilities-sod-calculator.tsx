import GrassIcon from '@mui/icons-material/Grass';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/sod-calculator",
    navName: "Sod Calculator",
    navDescription: "Sod rolls and pallets needed for your lawn.",
    name: "Sod Calculator",
    description: "Calculate lawn area and the number of sod rolls and pallets needed to cover it.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <GrassIcon fontSize="large" color="primary"/>,
    seoTitle: "Sod Calculator - Sod Rolls & Pallets Needed",
    seoDescription: "Free sod calculator. Enter your lawn's length and width to find the total area and the number of sod rolls and pallets you need to order.",
    keywords: ["sod calculator", "sod rolls calculator", "how much sod do i need", "sod pallet calculator", "lawn sod calculator"],
    ogTitle: "Sod Calculator - Sod Rolls & Pallets Needed | ToolZoneX",
    ogDescription: "Calculate lawn area and the number of sod rolls and pallets needed.",
    schemaName: "Sod Calculator",
    schemaDescription: "Calculate lawn area and the number of sod rolls and pallets needed to cover it.",
    applicationCategory: "UtilityApplication",
    currency: undefined,
    faqs: [{ question: "How is this different from the Lawn Area Calculator?", answer: "The Lawn Area Calculator only computes total square footage for irregularly-shaped yards made of multiple sections — it doesn't tell you how much material to buy. This Sod Calculator takes that same length-times-width area concept one step further and converts it directly into a sod rolls and pallets order count." }, { question: "How is this different from the Topsoil Calculator?", answer: "The Topsoil Calculator estimates the volume (and weight) of loose soil needed to fill an area to a certain depth — it deals in cubic feet or cubic yards of soil. This calculator instead counts discrete sod units (rolls and pallets) needed to cover a surface area — sod is sold by the piece, not by volume." }, { question: "Should I order extra sod beyond the calculated amount?", answer: "Yes — it's common practice to add 5-10% extra to account for irregular lawn edges, cutting around obstacles like trees or flower beds, and pieces damaged in handling. This calculator shows the exact area-based minimum; round up further if your lawn has a lot of curves or corners." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
