import FullscreenIcon from '@mui/icons-material/Fullscreen';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/yellow-screen",
    navName: "Yellow Screen",
    navDescription: "Plain fullscreen yellow.",
    name: "Yellow Screen",
    description: "A simple fullscreen yellow screen. Free online yellow screen for testing, backgrounds, or fun.",
    navCategory: "Screens",
    shellCategory: "Utilities",
    icon: <FullscreenIcon fontSize="large" color="primary"/>,
    seoTitle: "Yellow Screen - Free Fullscreen Yellow Display",
    seoDescription: "A simple fullscreen yellow screen. Free online yellow screen for testing, backgrounds, or fun.",
    keywords: ["yellow screen", "fullscreen yellow", "plain yellow screen"],
    ogTitle: "Yellow Screen - Free Fullscreen Yellow Display | ToolZoneX",
    ogDescription: "A simple fullscreen yellow screen. Free online yellow screen for testing, backgrounds, or fun.",
    schemaName: "YellowScreen",
    schemaDescription: "A simple fullscreen yellow screen. Free online yellow screen for testing, backgrounds, or fun.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: undefined,
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
