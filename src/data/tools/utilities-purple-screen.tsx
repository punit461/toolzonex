import FullscreenIcon from '@mui/icons-material/Fullscreen';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/purple-screen",
    navName: "Purple Screen",
    navDescription: "Plain fullscreen purple.",
    name: "Purple Screen",
    description: "A simple fullscreen purple screen. Free online purple screen for testing, backgrounds, or fun.",
    navCategory: "Screens",
    shellCategory: "Utilities",
    icon: <FullscreenIcon fontSize="large" color="primary"/>,
    seoTitle: "Purple Screen - Free Fullscreen Purple Display",
    seoDescription: "A simple fullscreen purple screen. Free online purple screen for testing, backgrounds, or fun.",
    keywords: ["purple screen", "fullscreen purple", "plain purple screen"],
    ogTitle: "Purple Screen - Free Fullscreen Purple Display | ToolZoneX",
    ogDescription: "A simple fullscreen purple screen. Free online purple screen for testing, backgrounds, or fun.",
    schemaName: "PurpleScreen",
    schemaDescription: "A simple fullscreen purple screen. Free online purple screen for testing, backgrounds, or fun.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: undefined,
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
