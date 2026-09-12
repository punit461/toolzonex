import DeckIcon from '@mui/icons-material/Deck';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/deck-material-calculator",
    navName: "Deck Material Calculator",
    navDescription: "Full deck materials list: boards, joists & more.",
    name: "Deck Material Calculator",
    description: "Calculate a fuller deck materials list — boards, joist count, and fasteners — from your deck's dimensions and board spacing.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <DeckIcon fontSize="large" color="primary"/>,
    seoTitle: "Deck Material Calculator - Full Materials List",
    seoDescription: "Free deck material calculator. Get a full materials list — boards, joists, and fasteners — for your deck build.",
    keywords: ["deck material calculator", "deck materials list calculator", "deck joist calculator", "deck building materials calculator", "how much decking material do i need"],
    ogTitle: "Deck Material Calculator - Full Materials List | ToolZoneX",
    ogDescription: "Get a full deck materials list including boards, joists, and fasteners.",
    schemaName: "Deck Material Calculator",
    schemaDescription: "Calculate a full deck materials list including board count, joist count, and fasteners.",
    applicationCategory: "UtilityApplication",
    currency: undefined,
    faqs: [{ question: "What joist spacing should I use?", answer: "16 inches on-center is the most common residential joist spacing, though some decking materials (especially composite boards installed at an angle) require tighter 12-inch spacing — check your decking manufacturer's span rating before finalizing spacing." }, { question: "How is this different from the simpler Deck Board Calculator?", answer: "The Deck Board Calculator gives you just the board count and linear footage. This calculator adds the rest of a real materials list on top of that — joist count based on your spacing, and a rough fastener estimate — so you can shop for framing lumber and hardware in the same pass." }, { question: "Should I add extra for waste on top of these numbers?", answer: "Yes — as with the simpler board calculator, add 10-15% extra boards for cutting waste and staggered joints, and buy a modest surplus of joists and fasteners rather than the exact calculated amount." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
