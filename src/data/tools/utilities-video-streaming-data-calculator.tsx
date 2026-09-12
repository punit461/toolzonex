import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/video-streaming-data-calculator",
    navName: "Video Streaming Data Calculator",
    navDescription: "Data usage by video quality tier.",
    name: "Video Streaming Data Calculator",
    description: "Estimate data usage from video streaming quality tier (SD, HD, 4K) and hours watched per day, week, or month.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <OndemandVideoIcon fontSize="large" color="primary"/>,
    seoTitle: "Video Streaming Data Calculator - SD, HD & 4K Data Usage",
    seoDescription: "Free video streaming data calculator. Pick a quality tier (SD, HD, 4K) and hours watched to estimate total streaming data usage.",
    keywords: ["video streaming data calculator", "how much data does netflix use", "streaming data usage calculator", "4k streaming data usage", "hd streaming data calculator"],
    ogTitle: "Video Streaming Data Calculator - SD, HD & 4K Data Usage | ToolZoneX",
    ogDescription: "Estimate video streaming data usage by quality tier and hours watched.",
    schemaName: "Video Streaming Data Calculator",
    schemaDescription: "Estimate video streaming data usage as hours watched times GB per hour for the selected quality tier (SD, HD, or 4K).",
    applicationCategory: "UtilityApplication",
    currency: undefined,
    faqs: [{ question: "How is this different from the Internet Data Usage Calculator?", answer: "The Internet Data Usage Calculator is a generic broadband usage estimator where you add multiple activities — streaming, video calls, browsing, gaming — each with hours and a custom rate. This tool is pre-loaded specifically with video-streaming quality-tier data rates (SD, HD, 4K), making it a faster, more focused way to estimate data use from streaming video alone." }, { question: "Are these data rates exact for every streaming service?", answer: "No — they're representative illustrative figures. Actual usage varies by platform, video codec, and specific quality setting (some services let you cap quality lower to save data), so check your streaming app's own data usage settings for a more precise number." }, { question: "Why does 4K use so much more data than HD?", answer: "4K video has roughly four times the pixel count of 1080p HD. While video compression narrows the gap somewhat, 4K streams still typically require several times more data per hour than standard HD streams to preserve that extra detail." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
