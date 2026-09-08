import TvIcon from '@mui/icons-material/Tv';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/generators/tv-series-tracker",
    navName: "TV Series Tracker",
    navDescription: "Track shows by status with season/episode and ratings.",
    name: "TV Series Tracker - Track Shows, Episodes, and Ratings",
    description: "Add TV shows with a Watching, Completed, or Plan to Watch status, track current season/episode while watching, and rate completed shows 1-5 stars.",
    navCategory: "Generators",
    shellCategory: "Generators",
    icon: <TvIcon fontSize="large" color="primary"/>,
    seoTitle: "TV Series Tracker - Track Shows, Episodes, and Ratings",
    seoDescription: "Free online TV series tracker. Track shows as Watching, Completed, or Plan to Watch, log your current season and episode, and rate completed shows.",
    keywords: ["tv series tracker", "tv show tracker online", "episode tracker generator", "tv watchlist maker", "shows to watch tracker"],
    ogTitle: "TV Series Tracker - Track Shows, Episodes, and Ratings | ToolZoneX",
    ogDescription: "Track shows by status, log your current season/episode, and rate completed shows.",
    schemaName: "TV Series Tracker",
    schemaDescription: "Add TV shows with a Watching, Completed, or Plan to Watch status, track current season/episode while watching, and rate completed shows 1-5 stars.",
    applicationCategory: "EntertainmentApplication",
    currency: undefined,
    faqs: [{ question: "Why do season and episode fields only appear for some shows?", answer: "They only appear when a show's status is Watching, since tracking progress only makes sense for a show you're actively partway through." }, { question: "Can I track multiple shows as Watching at once?", answer: "Yes — there's no limit, so you can track your current progress across as many shows as you're actively watching in parallel." }, { question: "Is my tracker saved between visits?", answer: "No — everything is generated fresh in your browser and resets on reload, so note down your progress elsewhere if you need it to persist." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
