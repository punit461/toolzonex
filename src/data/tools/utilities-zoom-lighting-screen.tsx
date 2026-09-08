import FullscreenIcon from '@mui/icons-material/Fullscreen';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/zoom-lighting-screen",
    navName: "Zoom Lighting Screen",
    navDescription: "Warm fullscreen light for video calls.",
    name: "Zoom Lighting Screen",
    description: "A bright, warm fullscreen light for video calls. Turn your screen into a ring light for better video lighting.",
    navCategory: "Screens",
    shellCategory: "Utilities",
    icon: <FullscreenIcon fontSize="large" color="primary"/>,
    seoTitle: "Zoom Lighting Screen - Turn Your Screen Into a Ring Light",
    seoDescription: "A bright, warm fullscreen light for video calls. Turn your screen into a ring light for better video lighting.",
    keywords: ["zoom lighting screen", "ring light screen", "video call lighting", "screen light for zoom"],
    ogTitle: "Zoom Lighting Screen - Turn Your Screen Into a Ring Light | ToolZoneX",
    ogDescription: "A bright, warm fullscreen light for video calls. Turn your screen into a ring light for better video lighting.",
    schemaName: "ZoomLightingScreen",
    schemaDescription: "A bright, warm fullscreen light for video calls. Turn your screen into a ring light for better video lighting.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: undefined,
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
