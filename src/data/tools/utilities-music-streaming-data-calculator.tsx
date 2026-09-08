import MusicNoteIcon from '@mui/icons-material/MusicNote';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/music-streaming-data-calculator",
    navName: "Music Streaming Data Calculator",
    navDescription: "Data usage by audio quality/bitrate tier.",
    name: "Music Streaming Data Calculator",
    description: "Estimate data usage from music streaming quality/bitrate tier (Low, Normal, High) and hours listened per day, week, or month.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <MusicNoteIcon fontSize="large" color="primary"/>,
    seoTitle: "Music Streaming Data Calculator - Low, Normal & High Quality",
    seoDescription: "Free music streaming data calculator. Pick an audio quality tier and hours listened to estimate total streaming data usage.",
    keywords: ["music streaming data calculator", "how much data does spotify use", "spotify data usage calculator", "music streaming data usage", "audio streaming data calculator"],
    ogTitle: "Music Streaming Data Calculator - Low, Normal & High Quality | ToolZoneX",
    ogDescription: "Estimate music streaming data usage by audio quality tier and hours listened.",
    schemaName: "Music Streaming Data Calculator",
    schemaDescription: "Estimate music streaming data usage by converting bitrate in kbps to GB per hour, multiplied by hours listened for the selected quality tier.",
    applicationCategory: "UtilityApplication",
    currency: undefined,
    faqs: [{ question: "Why is music streaming data usage so much lower than video?", answer: "Audio requires far less data than video because it has no visual information to encode — even a high-quality 320 kbps audio stream uses a small fraction of the data that even standard-definition video uses per hour." }, { question: "Do these bitrates match every streaming service exactly?", answer: "They're representative of common settings (many services offer roughly 24-64 kbps low-data modes, ~128 kbps normal streaming, and 256-320 kbps high-quality options), but exact bitrate labels and default settings vary by platform — check your app's audio quality settings for its specific figures." }, { question: "Does downloading for offline listening use less data overall?", answer: "Downloading a track uses the same data as streaming it once, but you avoid re-downloading that data every time you play it again — so for songs you replay often, downloading once for offline listening uses less total data than repeated streaming." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
