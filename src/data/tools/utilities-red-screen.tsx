import FullscreenIcon from '@mui/icons-material/Fullscreen';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/red-screen",
    navName: "Red Screen",
    navDescription: "Plain fullscreen red.",
    name: "Red Screen",
    description: "A simple fullscreen red screen. Free online red screen for testing, backgrounds, or fun.",
    navCategory: "Screens",
    shellCategory: "Utilities",
    icon: <FullscreenIcon fontSize="large" color="primary"/>,
    seoTitle: "Red Screen - Free Fullscreen Red Display",
    seoDescription: "A simple fullscreen red screen. Free online red screen for testing, backgrounds, or fun.",
    keywords: ["red screen", "red screen test", "fullscreen red", "plain red screen"],
    ogTitle: "Red Screen - Free Fullscreen Red Display | ToolZoneX",
    ogDescription: "A simple fullscreen red screen. Free online red screen for testing, backgrounds, or fun.",
    schemaName: "RedScreen",
    schemaDescription: "A simple fullscreen red screen. Free online red screen for testing, backgrounds, or fun.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: undefined,
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
