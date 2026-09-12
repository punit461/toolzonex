import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/generators/grocery-list-generator",
    navName: "Grocery List Generator",
    navDescription: "Build a shopping list from common grocery categories.",
    name: "Grocery List Generator",
    description: "Build a grocery shopping list by checking common items across categories like Produce, Dairy, and Pantry, plus your own custom items.",
    navCategory: "Generators",
    shellCategory: "Generators",
    icon: <ShoppingCartIcon fontSize="large" color="primary"/>,
    seoTitle: "Grocery List Generator - Build a Shopping List Online",
    seoDescription: "Build a grocery shopping list by checking common items across categories like Produce, Dairy, and Pantry, plus your own custom items. Free tool.",
    keywords: ["grocery list generator", "shopping list generator", "grocery list maker", "weekly grocery list", "grocery checklist"],
    ogTitle: "Grocery List Generator - Build a Shopping List Online | ToolZoneX",
    ogDescription: "Build a grocery shopping list by checking common items across categories, plus your own custom items.",
    schemaName: "Grocery List Generator",
    schemaDescription: "Build a grocery shopping list by checking common items across categories like Produce, Dairy, and Pantry, plus your own custom items.",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: [{ question: "Can I add items that aren't in the pre-set categories?", answer: "Yes — use the Add Custom Item field to add anything, and it will appear in the Other section of your final list." }, { question: "Is my list saved for next time?", answer: "No — the list resets when you reload the page, since it's generated fresh in your browser each visit rather than stored anywhere." }, { question: "Can I copy the list to share with someone else?", answer: "Yes — click the Copy button to copy your full grouped list as plain text, ready to paste into a text message, note, or email." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
