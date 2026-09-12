import FullscreenIcon from '@mui/icons-material/Fullscreen';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/black-screen",
    navName: "Black Screen",
    navDescription: "Plain fullscreen black.",
    name: "Black Screen",
    description: "A simple fullscreen black screen. Free online black screen for testing, backgrounds, or fun.",
    navCategory: "Screens",
    shellCategory: "Utilities",
    icon: <FullscreenIcon fontSize="large" color="primary"/>,
    seoTitle: "Black Screen - Free Fullscreen Black Display",
    seoDescription: "A simple fullscreen black screen. Free online black screen for testing, backgrounds, or fun.",
    keywords: ["black screen", "black screen test", "fullscreen black", "plain black screen"],
    ogTitle: "Black Screen - Free Fullscreen Black Display | ToolZoneX",
    ogDescription: "A simple fullscreen black screen. Free online black screen for testing, backgrounds, or fun.",
    schemaName: "BlackScreen",
    schemaDescription: "A simple fullscreen black screen. Free online black screen for testing, backgrounds, or fun.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: undefined,
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
