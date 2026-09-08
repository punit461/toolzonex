import FullscreenIcon from '@mui/icons-material/Fullscreen';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/broken-screen",
    navName: "Broken Screen",
    navDescription: "Fake cracked-screen prank.",
    name: "Broken Screen",
    description: "A fake cracked screen prank overlay. Go fullscreen to prank friends and coworkers -- no real damage.",
    navCategory: "Screens",
    shellCategory: "Utilities",
    icon: <FullscreenIcon fontSize="large" color="primary"/>,
    seoTitle: "Broken Screen Prank - Fake Cracked Screen Online",
    seoDescription: "A fake cracked screen prank overlay. Go fullscreen to prank friends and coworkers -- no real damage.",
    keywords: ["broken screen prank", "cracked screen prank", "fake broken screen", "screen crack prank"],
    ogTitle: "Broken Screen Prank - Fake Cracked Screen Online | ToolZoneX",
    ogDescription: "A fake cracked screen prank overlay. Go fullscreen to prank friends and coworkers -- no real damage.",
    schemaName: "BrokenScreen",
    schemaDescription: "A fake cracked screen prank overlay. Go fullscreen to prank friends and coworkers -- no real damage.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: undefined,
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
