import MusicNoteIcon from '@mui/icons-material/MusicNote';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/generators/playlist-organizer",
    navName: "Playlist Organizer",
    navDescription: "Organize a playlist with titles, artists, and notes.",
    name: "Playlist Organizer",
    description: "Organize a playlist by adding songs with title, artist, and optional notes, reordering them, and exporting a numbered, copyable list.",
    navCategory: "Generators",
    shellCategory: "Generators",
    icon: <MusicNoteIcon fontSize="large" color="primary"/>,
    seoTitle: "Playlist Organizer - Plan & Order Your Song List",
    seoDescription: "Free playlist organizer. Add songs with title, artist, and notes, reorder tracks, and export a numbered, copyable playlist.",
    keywords: ["playlist organizer", "playlist maker", "song list organizer", "playlist planner", "music playlist generator"],
    ogTitle: "Playlist Organizer - Plan & Order Your Song List | ToolZoneX",
    ogDescription: "Organize and reorder a playlist, then export it as a numbered list.",
    schemaName: "Playlist Organizer",
    schemaDescription: "Organize a playlist by adding songs with title, artist, and optional notes, reordering them, and exporting a numbered, copyable list.",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: [{ question: "Does this connect to Spotify or Apple Music?", answer: "No — this tool only helps you plan and organize a playlist as text. You'll need to manually add the songs to your streaming service of choice afterward." }, { question: "Can I reorder songs after adding them?", answer: "Yes — use the up and down arrow buttons next to each song to move it earlier or later in the list." }, { question: "Is my playlist saved between visits?", answer: "No — it resets on reload since it's generated fresh in your browser each time, so copy the export text if you want to keep a lasting copy." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
