import MusicNoteIcon from '@mui/icons-material/MusicNote';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/generators/playlist-name-generator",
    navName: "Playlist Name Generator",
    navDescription: "Generate mood-based playlist name ideas.",
    name: "Playlist Name Generator",
    description: "Generate playlist name suggestions based on mood or genre — Chill, Workout, Party, Focus, Road Trip, or Sad/Emo.",
    navCategory: "Generators",
    shellCategory: "Generators",
    icon: <MusicNoteIcon fontSize="large" color="primary"/>,
    seoTitle: "Playlist Name Generator - Mood-Based Playlist Ideas",
    seoDescription: "Free playlist name generator. Get mood-based playlist name suggestions for Chill, Workout, Party, Focus, Road Trip, and Sad/Emo vibes.",
    keywords: ["playlist name generator", "playlist name ideas", "spotify playlist names", "mood playlist generator", "workout playlist name generator"],
    ogTitle: "Playlist Name Generator - Mood-Based Playlist Ideas | ToolZoneX",
    ogDescription: "Get mood-based playlist name suggestions in one click.",
    schemaName: "Playlist Name Generator",
    schemaDescription: "Generate playlist name suggestions based on mood or genre — Chill, Workout, Party, Focus, Road Trip, or Sad/Emo.",
    applicationCategory: "LifestyleApplication",
    currency: "INR",
    faqs: [{ question: "Can I combine two moods in one playlist name?", answer: "The generator only pulls from one mood's list per click, but nothing stops you from picking your favorite word from two different generated names and combining them yourself." }, { question: "How many names are in each mood's list?", answer: "Each of the 6 moods has 12 hand-written suggestions, and each click shows 3 of them at random." }, { question: "Will I run out of new suggestions?", answer: "Each click reshuffles the full list for that mood, so you can keep regenerating to see different combinations of the 12 names." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
