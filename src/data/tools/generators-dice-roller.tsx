import CasinoIcon from '@mui/icons-material/Casino';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/generators/dice-roller",
    navName: "Dice Roller",
    navDescription: "Roll virtual d4-d20 dice.",
    name: "Dice Roller - Roll Virtual Dice Online",
    description: "Roll any number of virtual dice — d4, d6, d8, d10, d12, or d20 — and get an instant randomized result for each die plus the total sum.",
    navCategory: "Generators",
    shellCategory: "Generators",
    icon: <CasinoIcon fontSize="large" color="primary"/>,
    seoTitle: "Dice Roller - Roll Virtual d4, d6, d8, d10, d12, d20 Dice",
    seoDescription: "Free online dice roller. Roll any number of virtual d4, d6, d8, d10, d12, or d20 dice and get an instant randomized result plus the total sum.",
    keywords: ["dice roller", "roll dice online", "virtual dice", "d20 roller", "dnd dice roller", "random dice generator"],
    ogTitle: "Dice Roller - Roll Virtual Dice Online | ToolZoneX",
    ogDescription: "Roll any number of virtual dice and get an instant randomized result for each die plus the total sum.",
    schemaName: "Dice Roller",
    schemaDescription: "Roll a chosen number of virtual dice of a selected type and get individual and total results.",
    applicationCategory: "EntertainmentApplication",
    currency: "INR",
    faqs: [{ question: "Are the dice rolls truly random?", answer: "Each roll uses your browser's pseudorandom number generator to pick a value uniformly between 1 and the die's number of sides, which is unpredictable enough for games and casual use." }, { question: "What dice types are supported?", answer: "d4, d6, d8, d10, d12, and d20 — the standard set used in most tabletop RPGs and board games — with up to 10 dice rolled at once." }, { question: "Can I roll dice of different types together?", answer: "This roller rolls a chosen quantity of one die type at a time. To combine different types (like a d20 plus a d6), roll each type separately and add the totals together." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
