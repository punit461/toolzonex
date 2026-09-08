import AspectRatioIcon from '@mui/icons-material/AspectRatio';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/scale-factor-calculator",
    navName: "Scale Factor Calculator",
    navDescription: "Find a scale factor or a scaled/original dimension.",
    name: "Scale Factor Calculator - Models, Maps & Blueprints",
    description: "Calculate a scale factor from original and scaled dimensions, or find a missing dimension given a known scale factor.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <AspectRatioIcon fontSize="large" color="primary"/>,
    seoTitle: "Scale Factor Calculator - Models, Maps & Blueprints",
    seoDescription: "Free scale factor calculator. Find the scale factor between an original and scaled dimension, or solve for a missing dimension given a scale factor.",
    keywords: ["scale factor calculator", "scale calculator", "model scale calculator", "map scale calculator", "blueprint scale calculator"],
    ogTitle: "Scale Factor Calculator - Models, Maps & Blueprints | ToolZoneX",
    ogDescription: "Calculate scale factors for models, maps, and blueprints.",
    schemaName: "Scale Factor Calculator",
    schemaDescription: "Calculate a scale factor from original and scaled dimensions, or find a missing dimension given a known scale factor.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "What does a scale factor like 1:48 mean?", answer: "It means every 1 unit of measurement on the scaled object corresponds to 48 of the same unit in real life — so a 1:48 scale model is 1/48th the size of the real object in every dimension." }, { question: "Do I need to use the same units for both dimensions?", answer: "Yes — enter both the original and scaled dimension in the same unit (both in inches, or both in centimeters, for example) so the resulting scale factor is a pure, unitless ratio." }, { question: "Can I use this for maps as well as physical models?", answer: "Yes — a map's scale (like 1:100,000) works exactly the same way: the scale factor relates a distance measured on the map to the corresponding real-world distance, so you can solve for either one given the other and the scale factor." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
