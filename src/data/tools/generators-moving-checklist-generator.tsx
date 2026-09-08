import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/generators/moving-checklist-generator",
    navName: "Moving Checklist Generator",
    navDescription: "Build a moving checklist organized by timeline stage.",
    name: "Moving Checklist Generator",
    description: "Build a moving checklist with genuinely useful move-specific tasks organized by timeline — 8 Weeks Before, 4 Weeks Before, Moving Week, Moving Day, and After the Move.",
    navCategory: "Generators",
    shellCategory: "Generators",
    icon: <LocalShippingIcon fontSize="large" color="primary"/>,
    seoTitle: "Moving Checklist Generator - Timeline-Based Moving Checklist",
    seoDescription: "Free moving checklist generator. Build a move-specific checklist organized by timeline, from 8 weeks before to after the move.",
    keywords: ["moving checklist generator", "moving checklist", "house moving checklist", "moving timeline checklist", "relocation checklist"],
    ogTitle: "Moving Checklist Generator - Timeline-Based Moving Checklist | ToolZoneX",
    ogDescription: "Build a move-specific checklist organized by timeline stage.",
    schemaName: "Moving Checklist Generator",
    schemaDescription: "Build a moving checklist with genuinely useful move-specific tasks organized by timeline — 8 Weeks Before, 4 Weeks Before, Moving Week, Moving Day, and After the Move.",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: [{ question: "What if my move is happening sooner than 8 weeks out?", answer: "Start from whichever timeline stage matches how much time you have left — the tasks are still relevant even if you compress several stages into a shorter window." }, { question: "Can I add tasks specific to my own move?", answer: "Yes — use the \"Add Custom Task\" field for anything not already listed, such as cancelling a specific membership or arranging pet transport." }, { question: "Is my checklist saved between visits?", answer: "No — it resets on reload, so copy your checklist to a notes app or print it if you want a lasting reference throughout the move." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
