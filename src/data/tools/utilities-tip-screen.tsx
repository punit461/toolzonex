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
    faqs: [{ question: "Can I use this for a joke tip screen?", answer: "Yes — use the Joke preset or turn on Joke mode, and \"No Tip\" asks \"Are you sure?\" a few times before it gives in. You can also hide the No Tip button entirely, or change the heading to any favor you want \"tipped\" for." }, { question: "What happens when someone taps a tip?", answer: "The screen shows the tip and the total with a thank-you message, then returns to the tip choice after a few seconds, ready for the next person." }, { question: "Does this process real payments?", answer: "No — it's a display only, showing tip amounts for reference. It doesn't charge cards or record transactions, whether you're using it for a real restaurant bill or a joke." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
