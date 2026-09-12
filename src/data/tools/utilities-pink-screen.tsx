import FullscreenIcon from '@mui/icons-material/Fullscreen';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/pink-screen",
    navName: "Pink Screen",
    navDescription: "Plain fullscreen pink.",
    name: "Pink Screen",
    description: "A simple fullscreen pink screen. Free online pink screen for testing, backgrounds, or fun.",
    navCategory: "Screens",
    shellCategory: "Utilities",
    icon: <FullscreenIcon fontSize="large" color="primary"/>,
    seoTitle: "Pink Screen - Free Fullscreen Pink Display",
    seoDescription: "A simple fullscreen pink screen. Free online pink screen for testing, backgrounds, or fun.",
    keywords: ["pink screen", "fullscreen pink", "plain pink screen"],
    ogTitle: "Pink Screen - Free Fullscreen Pink Display | ToolZoneX",
    ogDescription: "A simple fullscreen pink screen. Free online pink screen for testing, backgrounds, or fun.",
    schemaName: "PinkScreen",
    schemaDescription: "A simple fullscreen pink screen. Free online pink screen for testing, backgrounds, or fun.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: undefined,
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
