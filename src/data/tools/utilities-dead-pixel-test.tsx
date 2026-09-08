import FullscreenIcon from '@mui/icons-material/Fullscreen';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/dead-pixel-test",
    navName: "Dead Pixel Test",
    navDescription: "Find stuck or dead pixels on your monitor.",
    name: "Dead Pixel Test",
    description: "Test your monitor for dead or stuck pixels with fullscreen white, black, red, green, and blue screens.",
    navCategory: "Screens",
    shellCategory: "Utilities",
    icon: <FullscreenIcon fontSize="large" color="primary"/>,
    seoTitle: "Dead Pixel Test - Check Your Monitor for Stuck Pixels",
    seoDescription: "Test your monitor for dead or stuck pixels with fullscreen white, black, red, green, and blue screens.",
    keywords: ["dead pixel test", "stuck pixel test", "monitor test", "screen test tool"],
    ogTitle: "Dead Pixel Test - Check Your Monitor for Stuck Pixels | ToolZoneX",
    ogDescription: "Test your monitor for dead or stuck pixels with fullscreen white, black, red, green, and blue screens.",
    schemaName: "DeadPixelTest",
    schemaDescription: "Test your monitor for dead or stuck pixels with fullscreen white, black, red, green, and blue screens.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: undefined,
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
