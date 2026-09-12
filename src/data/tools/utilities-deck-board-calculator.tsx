import ConstructionIcon from '@mui/icons-material/Construction';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/deck-board-calculator",
    navName: "Deck Board Calculator",
    navDescription: "Calculate deck boards and linear footage.",
    name: "Deck Board Calculator",
    description: "Calculate the number of deck boards and total linear footage needed for a deck based on its size, board width, and gap spacing.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <ConstructionIcon fontSize="large" color="primary"/>,
    seoTitle: "Deck Board Calculator - Calculate Boards & Linear Footage",
    seoDescription: "Free deck board calculator. Enter deck size, board width, and gap to calculate the number of deck boards and total linear footage needed.",
    keywords: ["deck board calculator", "how many deck boards do i need", "decking calculator", "deck material calculator", "deck boards needed"],
    ogTitle: "Deck Board Calculator - Calculate Boards & Linear Footage | ToolZoneX",
    ogDescription: "Calculate the number of deck boards needed for your deck.",
    schemaName: "Deck Board Calculator",
    schemaDescription: "Calculate the number of deck boards and total linear footage needed for a deck based on its size, board width, and gap spacing.",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: [{ question: "Should I add extra boards for waste and cuts?", answer: "Yes — this calculator gives the baseline number of boards to fully cover the deck's width. Most builders add 10-15% extra to account for cutting waste, mistakes, and staggered end joints, especially if boards don't come in exactly your deck's length." }, { question: "Why leave a gap between boards at all?", answer: "Gaps allow water to drain through the deck surface instead of pooling, and give the boards room to expand and contract with temperature and humidity changes without buckling or splitting." }, { question: "What if my boards don't span the full deck length in one piece?", answer: "If your deck is longer than the boards you're using, you'll need to join boards end-to-end over a joist, which uses more total linear footage than this calculator's simple length × board-count figure. Account for extra material and staggered seams in that case." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
