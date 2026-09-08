import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/xp-calculator",
    navName: "XP Calculator",
    navDescription: "XP needed to reach a target game level.",
    name: "XP Calculator",
    description: "Calculate the total XP needed to reach a target level and how much more XP you need, in simple linear or exponential RPG-style modes.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <SportsEsportsIcon fontSize="large" color="primary"/>,
    seoTitle: "XP Calculator - Experience Points Needed to Level Up",
    seoDescription: "Free XP calculator. Enter your current level and XP to find how much more experience you need to reach a target level, in linear or exponential mode.",
    keywords: ["xp calculator", "experience points calculator", "level up calculator", "rpg xp calculator", "game leveling calculator"],
    ogTitle: "XP Calculator - Experience Points Needed to Level Up | ToolZoneX",
    ogDescription: "Calculate the total XP needed to reach a target level and how much more you need.",
    schemaName: "XP Calculator",
    schemaDescription: "Calculate total XP needed to reach a target game level and remaining XP needed, in linear or exponential mode.",
    applicationCategory: "UtilityApplication",
    currency: undefined,
    faqs: [{ question: "Which mode should I use for my game?", answer: "Start with Simple Linear mode — it fits many games where each level requires the same fixed XP amount. Switch to Exponential mode only if your specific game (many RPGs and MMOs) is known to require noticeably more XP at higher levels." }, { question: "How do I find the right base and exponent for exponential mode?", answer: "These values are game-specific and usually come from community-documented formulas, datamined game files, or your own game's design spec — there's no universal base/exponent that fits every game, so you'll need the specific values for the title (or design) you're calculating for." }, { question: "Why does total XP in exponential mode sum every level instead of just using the target level's formula?", answer: "Because the formula gives the XP needed to go from one specific level to the next, not the cumulative total — reaching level 10 means first passing through levels 1 through 9, so the calculator adds up the XP cost of every level along the way." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
