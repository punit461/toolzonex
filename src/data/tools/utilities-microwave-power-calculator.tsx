import KitchenIcon from '@mui/icons-material/Kitchen';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/microwave-power-calculator",
    navName: "Microwave Power Calculator",
    navDescription: "Adjust cook time for a different microwave wattage.",
    name: "Microwave Power Calculator",
    description: "Calculate the adjusted cook time when using a microwave with a different wattage than a recipe or package assumes.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <KitchenIcon fontSize="large" color="primary"/>,
    seoTitle: "Microwave Power Calculator - Adjust Cook Time by Wattage",
    seoDescription: "Free microwave power calculator. Enter original cook time and wattage plus your microwave's wattage to calculate the adjusted cook time.",
    keywords: ["microwave power calculator", "microwave wattage conversion calculator", "microwave cook time calculator", "microwave wattage calculator", "adjust microwave cook time"],
    ogTitle: "Microwave Power Calculator - Adjust Cook Time by Wattage | ToolZoneX",
    ogDescription: "Calculate the adjusted cook time when using a microwave with a different wattage than a recipe assumes.",
    schemaName: "Microwave Power Calculator",
    schemaDescription: "Calculate adjusted cook time as original time times the ratio of original wattage to your microwave's wattage.",
    applicationCategory: "UtilityApplication",
    currency: undefined,
    faqs: [{ question: "Why does a lower wattage need MORE time, not less?", answer: "Wattage measures how much energy the microwave delivers per second. A lower-wattage microwave delivers energy more slowly, so it takes longer to deliver the same total amount of energy needed to heat the food through — hence more time, not less." }, { question: "Where do I find my microwave's actual wattage?", answer: "Check the inside of the door, the back panel, or the manufacturer's manual — it's usually listed in watts (e.g. \"700W\" or \"1100W\"). This is different from the wattage a recipe assumes, which is why conversion matters." }, { question: "Is this conversion exact for all foods?", answer: "It's a solid mathematical starting point, but actual results can vary slightly by food density, moisture content, and container material. Check food periodically near the end of the adjusted time rather than relying on it as an exact cutoff." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
