import FullscreenIcon from '@mui/icons-material/Fullscreen';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/tip-screen",
    navName: "Tip Screen",
    navDescription: "Fullscreen tip screen — for real tipping or a joke.",
    name: "Tip Screen Generator",
    description: "A fullscreen tip screen with a custom heading, subtotal, and tip percentages — use it for real restaurant/POS tipping, or as a funny joke tip screen for friends.",
    navCategory: "Screens",
    shellCategory: "Utilities",
    icon: <FullscreenIcon fontSize="large" color="primary"/>,
    seoTitle: "Tip Screen Generator - Custom Tipping Display, Real or Funny",
    seoDescription: "Free tip screen generator with a custom heading, subtotal, and tip percentages. Use it for real restaurant/POS tipping, or make a funny joke tip screen for friends.",
    keywords: ["tip screen", "add a tip screen", "tip percentage screen", "tip screen generator", "funny tip screen", "tip screen meme", "custom tip screen", "tipping display", "pos tip screen", "restaurant tip screen", "digital tip jar"],
    ogTitle: "Tip Screen Generator - Custom Tipping Display, Real or Funny | ToolZoneX",
    ogDescription: "A fullscreen tip screen with a custom heading, subtotal, and tip percentages — use it for real tipping, or as a joke tip screen for friends.",
    schemaName: "TipScreen",
    schemaDescription: "A fullscreen tip screen with a custom heading, subtotal, and tip percentages — use it for real restaurant/POS tipping, or as a funny joke tip screen for friends.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "Can I use this for a joke tip screen?", answer: "Yes — change the Screen Heading field to whatever you want (a chore, a favor, an inside joke), set the subtotal and percentages, then go fullscreen and show it to whoever you're \"charging.\"" }, { question: "Does this process real payments?", answer: "No — it's a display only, showing tip amounts for reference. It doesn't charge cards or record transactions, whether you're using it for a real restaurant bill or a joke." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
