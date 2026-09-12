import CakeIcon from '@mui/icons-material/Cake';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/baking-pan-converter",
    navName: "Baking Pan Converter",
    navDescription: "Convert recipes between pan sizes.",
    name: "Baking Pan Converter",
    description: "Find the volume scaling factor between two baking pan sizes to adjust a recipe, plus general baking-time guidance.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <CakeIcon fontSize="large" color="primary"/>,
    seoTitle: "Baking Pan Converter - Convert Recipes Between Pan Sizes",
    seoDescription: "Free baking pan converter. Pick your original and substitute pan sizes to find the volume scaling factor and baking-time guidance.",
    keywords: ["baking pan converter", "pan size conversion", "cake pan substitution calculator", "pan volume calculator", "baking pan size chart"],
    ogTitle: "Baking Pan Converter - Convert Recipes Between Pan Sizes | ToolZoneX",
    ogDescription: "Find the volume scaling factor between two baking pan sizes for recipe substitutions.",
    schemaName: "Baking Pan Converter",
    schemaDescription: "Calculate the volume scaling factor between two baking pan sizes for recipe substitution, with baking-time guidance.",
    applicationCategory: "UtilityApplication",
    currency: undefined,
    faqs: [{ question: "Are these pan volumes exact?", answer: "No — they're commonly published approximate figures for standard pan depths. Actual volume varies slightly by manufacturer and by how full you fill the pan, so use the scaling factor as a strong starting estimate rather than an exact conversion." }, { question: "Why doesn't the tool give me an exact new bake time?", answer: "Bake time depends on batter depth, pan material, and oven behavior in ways that don't reduce to a simple formula. The safest approach is to check for doneness (a toothpick test, visual browning, or an internal temperature) starting earlier than the original recipe's time when using a pan that spreads the batter thinner." }, { question: "What if I don't see my exact pan size listed?", answer: "Pick the closest listed pan by volume as a reasonable substitute, or calculate your pan's volume directly (roughly, area of the base times depth, converted to cups) and scale from there manually." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
