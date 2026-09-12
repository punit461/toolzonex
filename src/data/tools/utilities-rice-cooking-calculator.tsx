import RiceBowlIcon from '@mui/icons-material/RiceBowl';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/rice-cooking-calculator",
    navName: "Rice Cooking Calculator",
    navDescription: "Water, time, and yield by rice type.",
    name: "Rice Cooking Calculator",
    description: "Calculate water needed, cook time, and cooked yield for white, brown, basmati, or jasmine rice.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <RiceBowlIcon fontSize="large" color="primary"/>,
    seoTitle: "Rice Cooking Calculator - Water Ratio & Cook Time",
    seoDescription: "Free rice cooking calculator. Select rice type and dry rice amount to calculate water needed, cook time, and cooked yield.",
    keywords: ["rice cooking calculator", "rice to water ratio calculator", "rice cooking time calculator", "how much water for rice", "rice yield calculator"],
    ogTitle: "Rice Cooking Calculator - Water Ratio & Cook Time | ToolZoneX",
    ogDescription: "Calculate water needed, cook time, and cooked yield for different rice types.",
    schemaName: "Rice Cooking Calculator",
    schemaDescription: "Calculate water needed as dry rice cups times the water-to-rice ratio for the selected rice type, plus standard cook time and yield.",
    applicationCategory: "UtilityApplication",
    currency: undefined,
    faqs: [{ question: "Are these water ratios and times exact for every stove or rice cooker?", answer: "They're standard published starting points for stovetop cooking. Rice cookers, altitude, pot type, and even the age of the rice can shift the ideal ratio and time slightly, so adjust based on your own results over a few batches." }, { question: "Why does rice roughly triple in volume when cooked?", answer: "Rice grains absorb water during cooking and swell significantly — white, basmati, and jasmine rice typically expand to about 3 times their dry volume, while brown rice expands somewhat less due to its intact bran layer." }, { question: "Should I rinse rice before cooking?", answer: "Rinsing removes surface starch and is commonly recommended for basmati and jasmine rice to keep grains separate and fluffy; it's optional for white and brown rice, though rinsing generally doesn't hurt." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
