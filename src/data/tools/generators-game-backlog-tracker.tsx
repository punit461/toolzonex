import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/generators/game-backlog-tracker",
    navName: "Game Backlog Tracker",
    navDescription: "Track your video game backlog, playtime, and ratings.",
    name: "Game Backlog Tracker - Track Games, Hours, and Ratings",
    description: "Add video games with platform, a Backlog, Playing, or Completed status, estimated hours played, and a rating for completed games.",
    navCategory: "Generators",
    shellCategory: "Generators",
    icon: <SportsEsportsIcon fontSize="large" color="primary"/>,
    seoTitle: "Game Backlog Tracker - Track Games, Hours, and Ratings",
    seoDescription: "Free online game backlog tracker. Track video games as Backlog, Playing, or Completed, log hours played, and rate completed games.",
    keywords: ["game backlog tracker", "video game backlog generator", "games to play tracker", "game tracker online", "backlog list maker"],
    ogTitle: "Game Backlog Tracker - Track Games, Hours, and Ratings | ToolZoneX",
    ogDescription: "Track video games by status, log hours played, and rate completed games.",
    schemaName: "Game Backlog Tracker",
    schemaDescription: "Add video games with platform, a Backlog, Playing, or Completed status, estimated hours played, and a rating for completed games.",
    applicationCategory: "GameApplication",
    currency: undefined,
    faqs: [{ question: "Why does the rating field only appear for Completed games?", answer: "A meaningful rating usually requires having finished (or at least substantially played) a game, so the field only shows once a game's status is set to Completed." }, { question: "Do I have to enter exact hours played?", answer: "No — the hours field accepts any estimate, so a rough guess is fine if you don't track exact playtime elsewhere." }, { question: "Can I track the same game on two different platforms separately?", answer: "Yes — just add it twice with a different platform noted in each entry, since each row is tracked independently." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
