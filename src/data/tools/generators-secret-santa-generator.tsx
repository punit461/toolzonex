import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/generators/secret-santa-generator",
    navName: "Secret Santa Generator",
    navDescription: "Randomly pair gift givers for Secret Santa.",
    name: "Secret Santa Generator",
    description: "Randomly assign Secret Santa gift pairs for your group. Fair, no one draws their own name. Free online generator.",
    navCategory: "Generators",
    shellCategory: "Generators",
    icon: <CardGiftcardIcon fontSize="large" color="primary"/>,
    seoTitle: "Secret Santa Generator - Random Pair Generator",
    seoDescription: "Free online Secret Santa generator. Enter names and get random gift pairs for your group. Fair, no one draws their own name.",
    keywords: ["secret santa generator", "secret santa", "gift exchange", "random pair generator", "santa pairs"],
    ogTitle: "Secret Santa Generator - Random Pair Generator | ToolZoneX",
    ogDescription: "Enter names and get random Secret Santa gift pairs for your group.",
    schemaName: "Secret Santa Generator",
    schemaDescription: "Randomly assign Secret Santa gift pairs for your group.",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: undefined,
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
