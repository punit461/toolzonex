import FullscreenIcon from '@mui/icons-material/Fullscreen';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/dvd-screensaver",
    navName: "DVD Screensaver",
    navDescription: "The classic bouncing DVD logo.",
    name: "DVD Screensaver",
    description: "The classic bouncing DVD logo screensaver, recreated online. Customize the text and go fullscreen.",
    navCategory: "Screens",
    shellCategory: "Utilities",
    icon: <FullscreenIcon fontSize="large" color="primary"/>,
    seoTitle: "DVD Screensaver - The Classic Bouncing Logo Online",
    seoDescription: "The classic bouncing DVD logo screensaver, recreated online. Customize the text and go fullscreen.",
    keywords: ["dvd screensaver", "bouncing dvd logo", "dvd logo bounce", "online screensaver"],
    ogTitle: "DVD Screensaver - The Classic Bouncing Logo Online | ToolZoneX",
    ogDescription: "The classic bouncing DVD logo screensaver, recreated online. Customize the text and go fullscreen.",
    schemaName: "DvdScreensaver",
    schemaDescription: "The classic bouncing DVD logo screensaver, recreated online. Customize the text and go fullscreen.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: undefined,
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
