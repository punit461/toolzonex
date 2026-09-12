import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/text-tools/reverse-text",
    navName: "Reverse Text",
    navDescription: "Quickly reverse characters or word order.",
    name: "Reverse Text",
    description: "Reverse text characters or word order instantly, live as you type. A simpler, quicker alternative to the full Text Reverser.",
    navCategory: "Text Tools",
    shellCategory: "Text Tools",
    icon: <SwapHorizIcon fontSize="large" color="primary"/>,
    seoTitle: "Reverse Text Online - Instant Text Reverser",
    seoDescription: "Reverse text characters or word order instantly, live as you type. A simpler, quicker alternative to the full Text Reverser tool.",
    keywords: ["reverse text", "reverse text online", "text reverse tool", "flip text order", "reverse word order", "backwards text"],
    ogTitle: "Reverse Text Online - Instant Text Reverser | ToolZoneX",
    ogDescription: "Reverse text characters or word order instantly, live as you type.",
    schemaName: "Reverse Text",
    schemaDescription: "Reverse text characters or word order instantly, live as you type.",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: [{ question: "How is this different from the Text Reverser tool?", answer: "Our Text Reverser page offers four modes (full reverse, word order, per-word letters, and line order) behind a manual \"Reverse\" button. This page is a simpler, quicker alternative with just the two most common modes and a live result that updates as you type, with no button needed." }, { question: "Does reversing affect spaces and punctuation?", answer: "In \"Reverse Characters\" mode, yes — every character including spaces and punctuation is reversed along with the letters. In \"Reverse Word Order\" mode, punctuation attached to a word travels with it." }, { question: "Can I reverse just the letters within each word?", answer: "Not on this page — for reversing letters inside each word while keeping word order, or for reversing line order, use the full Text Reverser tool, which supports those additional modes." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
