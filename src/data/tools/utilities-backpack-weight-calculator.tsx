import HikingIcon from '@mui/icons-material/Hiking';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/backpack-weight-calculator",
    navName: "Backpack Weight Calculator",
    navDescription: "Pack weight as a % of your body weight.",
    name: "Backpack Weight Calculator",
    description: "Add gear items to calculate total hiking pack weight and check it against a guideline percentage of your body weight.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <HikingIcon fontSize="large" color="primary"/>,
    seoTitle: "Backpack Weight Calculator - Pack Weight vs Body Weight",
    seoDescription: "Free backpack weight calculator. Add your hiking gear items and body weight to find total pack weight and its percentage of your body weight.",
    keywords: ["backpack weight calculator", "hiking pack weight calculator", "pack weight percentage calculator", "how heavy should my backpack be", "backpacking weight calculator"],
    ogTitle: "Backpack Weight Calculator - Pack Weight vs Body Weight | ToolZoneX",
    ogDescription: "Calculate total hiking pack weight and its percentage of your body weight.",
    schemaName: "Backpack Weight Calculator",
    schemaDescription: "Calculate total hiking pack weight from gear items and check it against a guideline percentage of body weight.",
    applicationCategory: "UtilityApplication",
    currency: undefined,
    faqs: [{ question: "Where does the 20% guideline come from?", answer: "It's a widely cited rule of thumb among hikers and backpacking guides rather than a strict medical or scientific threshold. Ultralight backpackers often aim well below it (10-15%), while some expedition-style trips with heavy technical gear may exceed it out of necessity." }, { question: "Should I include water and food weight?", answer: "Yes — include the full weight of food and water you'll be carrying at the start of a leg, since that's when your pack is heaviest. Water in particular adds up fast at roughly 2.2 lb (1 kg) per liter." }, { question: "Does this account for base weight versus total weight?", answer: "No — this calculator totals everything you enter as one figure. If you want to track \"base weight\" (gear excluding consumables like food, water, and fuel) separately, list those items in a second pass without your consumables." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
