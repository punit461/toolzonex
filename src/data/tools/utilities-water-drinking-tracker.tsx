import LocalDrinkIcon from '@mui/icons-material/LocalDrink';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/water-drinking-tracker",
    navName: "Water Drinking Tracker",
    navDescription: "Tap to log glasses toward a daily hydration goal.",
    name: "Water Drinking Tracker - Daily Hydration Goal Counter",
    description: "Set a daily water goal in glasses, liters, or milliliters, then tap to add a glass and watch a live progress bar toward your target.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <LocalDrinkIcon fontSize="large" color="primary"/>,
    seoTitle: "Water Drinking Tracker - Daily Hydration Goal Counter",
    seoDescription: "Free water drinking tracker. Set a daily hydration goal and tap to log each glass, with a live progress bar toward your target.",
    keywords: ["water drinking tracker", "hydration tracker online", "daily water intake counter", "glass of water counter", "water goal tracker"],
    ogTitle: "Water Drinking Tracker - Daily Hydration Goal Counter | ToolZoneX",
    ogDescription: "Set a daily water goal and tap to log each glass toward your target.",
    schemaName: "Water Drinking Tracker",
    schemaDescription: "Set a daily water goal in glasses, liters, or milliliters, then tap to add a glass and watch a live progress bar toward your target.",
    applicationCategory: "HealthApplication",
    currency: undefined,
    faqs: [{ question: "Does this tool save my water intake history?", answer: "No — this is a static, client-side-only tool with no backend or account system, so today's count is stored only in your browser's memory and resets whenever you reload or close the page." }, { question: "How much is one \"glass\"?", answer: "Each glass is counted as a standard 250 ml (about 8.5 fl oz) serving, which is used to convert your tally into liters or milliliters for the goal comparison." }, { question: "Can I set a goal in liters instead of glasses?", answer: "Yes — use the unit toggle to switch the goal field between glasses, liters, and milliliters; your glass count is automatically converted to match whichever unit you choose." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
