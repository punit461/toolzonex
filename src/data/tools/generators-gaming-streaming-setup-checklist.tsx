import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/generators/gaming-streaming-setup-checklist",
    navName: "Gaming & Streaming Setup Checklist",
    navDescription: "Essentials for a gaming station or a live streaming setup.",
    name: "Gaming & Streaming Setup Checklist",
    description: "Check off Gaming Setup essentials (monitor, controller, headset, chair, lighting) or Streaming Setup essentials (webcam, mic, lighting, capture card, software, internet).",
    navCategory: "Generators",
    shellCategory: "Generators",
    icon: <SportsEsportsIcon fontSize="large" color="primary"/>,
    seoTitle: "Gaming & Streaming Setup Checklist - Get Set Up Right",
    seoDescription: "Free gaming and streaming setup checklist. Check off gaming station essentials or streaming essentials like webcam, mic, and lighting.",
    keywords: ["gaming setup checklist", "streaming setup checklist", "stream setup essentials", "gaming station checklist", "twitch setup checklist"],
    ogTitle: "Gaming & Streaming Setup Checklist - Get Set Up Right | ToolZoneX",
    ogDescription: "Check off gaming station essentials or streaming setup essentials.",
    schemaName: "Gaming & Streaming Setup Checklist",
    schemaDescription: "Check off Gaming Setup essentials (monitor, controller, headset, chair, lighting) or Streaming Setup essentials (webcam, mic, lighting, capture card, software, internet).",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: [{ question: "Do Gaming Setup and Streaming Setup share checked items?", answer: "No — each category keeps its own checked state, so switching between them doesn't affect your progress on the other." }, { question: "Do I need a capture card for every streaming setup?", answer: "No — a capture card is only needed if you're streaming footage from a console or a second PC; streaming directly from the same PC you're recording with doesn't require one." }, { question: "Is my checklist saved anywhere?", answer: "No — the checklist resets when you reload the page, since it's generated fresh in your browser each visit rather than stored anywhere." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
