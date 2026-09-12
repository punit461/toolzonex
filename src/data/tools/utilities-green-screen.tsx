import FullscreenIcon from '@mui/icons-material/Fullscreen';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/green-screen",
    navName: "Green Screen",
    navDescription: "Chroma-key green for video calls.",
    name: "Green Screen",
    description: "A simple fullscreen chroma-key green screen. Free online green screen for backgrounds, testing, or streaming.",
    navCategory: "Screens",
    shellCategory: "Utilities",
    icon: <FullscreenIcon fontSize="large" color="primary"/>,
    seoTitle: "Green Screen - Free Fullscreen Chroma Key Display",
    seoDescription: "A simple fullscreen chroma-key green screen. Free online green screen for backgrounds, testing, or streaming.",
    keywords: ["green screen", "chroma key screen", "fullscreen green", "green screen background"],
    ogTitle: "Green Screen - Free Fullscreen Chroma Key Display | ToolZoneX",
    ogDescription: "A simple fullscreen chroma-key green screen. Free online green screen for backgrounds, testing, or streaming.",
    schemaName: "GreenScreen",
    schemaDescription: "A simple fullscreen chroma-key green screen. Free online green screen for backgrounds, testing, or streaming.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: undefined,
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
