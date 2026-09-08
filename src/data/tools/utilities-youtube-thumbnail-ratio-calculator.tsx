import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/youtube-thumbnail-ratio-calculator",
    navName: "YouTube Thumbnail Ratio Calculator",
    navDescription: "YouTube's official thumbnail size guidelines.",
    name: "YouTube Thumbnail Ratio Calculator",
    description: "Calculate proportional YouTube thumbnail dimensions or check an existing image against YouTube's official 1280x720, 16:9 thumbnail guidelines.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <OndemandVideoIcon fontSize="large" color="primary"/>,
    seoTitle: "YouTube Thumbnail Ratio Calculator - 16:9 Thumbnail Size",
    seoDescription: "Free YouTube thumbnail ratio calculator. Use YouTube's recommended 1280x720 preset, calculate proportional dimensions, or check your thumbnail against guidelines.",
    keywords: ["youtube thumbnail ratio calculator", "youtube thumbnail size", "1280x720 calculator", "youtube thumbnail dimensions", "youtube thumbnail guidelines"],
    ogTitle: "YouTube Thumbnail Ratio Calculator - 16:9 Thumbnail Size | ToolZoneX",
    ogDescription: "Calculate proportional YouTube thumbnail dimensions using YouTube's official guidelines.",
    schemaName: "YouTube Thumbnail Ratio Calculator",
    schemaDescription: "Calculate YouTube thumbnail dimensions or check an image against YouTube's official 1280x720, 16:9 thumbnail guidelines.",
    applicationCategory: "UtilityApplication",
    currency: undefined,
    faqs: [{ question: "How is this different from the general Aspect Ratio Calculator?", answer: "The Aspect Ratio Calculator is a general-purpose tool for calculating any ratio between any two dimensions. This tool is pre-loaded specifically with YouTube's official thumbnail guidelines — the 1280x720 recommended size, the 640px minimum width, and the 16:9 target ratio — built for content creators sizing thumbnails specifically." }, { question: "What happens if my thumbnail isn't exactly 16:9?", answer: "YouTube will still accept it, but it may be cropped or padded when displayed in different placements across the platform (search results, suggested videos, mobile), so matching 16:9 exactly gives the most predictable, uncropped appearance." }, { question: "Does file size matter as much as pixel dimensions?", answer: "Yes — YouTube also enforces a roughly 2MB file size limit on thumbnail uploads separate from pixel dimensions, so a correctly-sized image with heavy compression artifacts or an uncompressed format can still be rejected for exceeding the file size cap." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
