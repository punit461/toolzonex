import HomeWorkIcon from '@mui/icons-material/HomeWork';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/built-up-area-calculator",
    navName: "Built-up Area Calculator",
    navDescription: "Carpet area to built-up area (India).",
    name: "Built-up Area Calculator",
    description: "Convert carpet area to built-up area (or back-calculate carpet area from built-up area) using an adjustable loading factor, for Indian real estate.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <HomeWorkIcon fontSize="large" color="primary"/>,
    seoTitle: "Built-up Area Calculator - Carpet to Built-up Area (India)",
    seoDescription: "Free built-up area calculator for Indian real estate. Convert carpet area to built-up area (or back) using an adjustable loading factor.",
    keywords: ["built-up area calculator", "carpet area to built-up area", "loading factor calculator", "built up area formula", "indian real estate area calculator"],
    ogTitle: "Built-up Area Calculator - Carpet to Built-up Area | ToolZoneX",
    ogDescription: "Convert carpet area to built-up area using an adjustable loading factor.",
    schemaName: "Built-up Area Calculator",
    schemaDescription: "Convert carpet area to built-up area (or back-calculate carpet area from built-up area) using an adjustable loading factor.",
    applicationCategory: "UtilityApplication",
    currency: undefined,
    faqs: [{ question: "Is this the same \"carpet area\" as the Carpet Area Calculator on this site?", answer: "No — that's a naming coincidence. Our Carpet Area Calculator is about buying physical carpet flooring material for a room in a US context (length × width of floor to carpet). This Built-up Area Calculator uses \"carpet area\" in the Indian real estate sense — the usable floor space inside a unit's walls, unrelated to buying carpet material." }, { question: "What's a typical loading factor?", answer: "Most Indian apartments use a loading factor between 10% and 20%, depending on wall thickness, common balconies, and building design. Always check your specific builder's stated loading factor rather than assuming a default." }, { question: "Is built-up area the figure used to price apartments?", answer: "Not usually — most listings price per square foot of super built-up area, which goes one step further than built-up area by also including a share of shared spaces like lobbies and stairwells. Use our Super Built-up Area Calculator for that figure." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
