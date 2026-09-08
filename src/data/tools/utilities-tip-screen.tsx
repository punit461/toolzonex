import FullscreenIcon from '@mui/icons-material/Fullscreen';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/tip-screen",
    navName: "Tip Screen",
    navDescription: "Fullscreen tipping display for restaurants & POS.",
    name: "Tip Screen",
    description: "A fullscreen tipping display for restaurants and point-of-sale systems — enter a subtotal and show customers exact tip amounts.",
    navCategory: "Screens",
    shellCategory: "Utilities",
    icon: <FullscreenIcon fontSize="large" color="primary"/>,
    seoTitle: "Tip Screen - Fullscreen Tipping Display for Restaurants",
    seoDescription: "A fullscreen tipping display for restaurants and point-of-sale systems. Enter a subtotal and show customers exact tip amounts.",
    keywords: ["tip screen", "tipping display", "pos tip screen", "restaurant tip screen", "digital tip jar"],
    ogTitle: "Tip Screen - Fullscreen Tipping Display for Restaurants | ToolZoneX",
    ogDescription: "A fullscreen tipping display for restaurants and point-of-sale systems. Enter a subtotal and show customers exact tip amounts.",
    schemaName: "TipScreen",
    schemaDescription: "A fullscreen tipping display for restaurants and point-of-sale systems. Enter a subtotal and show customers exact tip amounts.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: undefined,
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
