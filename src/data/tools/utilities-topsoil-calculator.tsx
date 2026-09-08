import GrassIcon from '@mui/icons-material/Grass';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/topsoil-calculator",
    navName: "Topsoil Calculator",
    navDescription: "Calculate topsoil volume & weight needed.",
    name: "Topsoil Calculator",
    description: "Calculate the volume and estimated weight of topsoil needed to cover an area to a given depth.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <GrassIcon fontSize="large" color="primary"/>,
    seoTitle: "Topsoil Calculator - How Much Topsoil Do You Need?",
    seoDescription: "Free topsoil calculator. Enter length, width, and depth to find the volume of topsoil needed in cubic feet, yards, or meters, plus estimated weight.",
    keywords: ["topsoil calculator", "how much topsoil do i need", "topsoil volume calculator", "topsoil weight calculator", "garden bed topsoil calculator"],
    ogTitle: "Topsoil Calculator - How Much Topsoil Do You Need? | ToolZoneX",
    ogDescription: "Calculate the volume and weight of topsoil needed for your project.",
    schemaName: "Topsoil Calculator",
    schemaDescription: "Calculate the volume and estimated weight of topsoil needed to cover an area to a given depth.",
    applicationCategory: "UtilityApplication",
    currency: undefined,
    faqs: [{ question: "Does topsoil density really vary that much?", answer: "Yes — dry, loose topsoil sits toward the lower end of the range while damp, compacted, or clay-heavy topsoil can weigh noticeably more. Adjust the density field above if your supplier gives you a specific figure for the soil blend you're buying." }, { question: "How is this different from the Mulch or Gravel Calculator?", answer: "The same length × width × depth formula applies to any bulk landscaping material, but topsoil, mulch, and gravel each have very different densities, so this tool uses topsoil-specific defaults rather than the mulch or gravel figures used in those calculators." }, { question: "Should I compact the soil after spreading it?", answer: "Lightly settling topsoil (with water or a light tamp) is common after spreading, which can reduce its volume by 10-20%. If you're filling to a precise finished depth, consider ordering slightly extra to account for settling." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
