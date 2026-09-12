import EventIcon from '@mui/icons-material/Event';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/game-score-tracker",
    navName: "Game Score Tracker",
    navDescription: "Live scoreboard & leaderboard.",
    name: "Game Score Tracker",
    description: "Track scores for board games, sports, and party games online. Free multiplayer scoreboard with a live leaderboard.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <EventIcon fontSize="large" color="primary"/>,
    seoTitle: "Game Score Tracker - Online Scoreboard & Leaderboard",
    seoDescription: "Track scores for board games, sports, and party games online. Free multiplayer scoreboard with a live leaderboard.",
    keywords: ["game score tracker", "online scoreboard", "score keeper", "board game tracker", "party game scores"],
    ogTitle: "Game Score Tracker - Online Scoreboard & Leaderboard | ToolZoneX",
    ogDescription: "Track scores for board games, sports, and party games online. Free multiplayer scoreboard with a live leaderboard.",
    schemaName: "Game Score Tracker",
    schemaDescription: "Track scores for board games, sports, and party games online. Free multiplayer scoreboard with a live leaderboard.",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: undefined,
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
