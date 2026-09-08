import FullscreenIcon from '@mui/icons-material/Fullscreen';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/windows-10-blue-screen",
    navName: "Windows 10 Blue Screen",
    navDescription: "Fake BSOD prank.",
    name: "Windows 10 Blue Screen",
    description: "A fake Windows 10 blue screen of death (BSOD) prank. Go fullscreen for the full effect -- nothing is actually wrong.",
    navCategory: "Screens",
    shellCategory: "Utilities",
    icon: <FullscreenIcon fontSize="large" color="primary"/>,
    seoTitle: "Windows 10 Blue Screen Prank",
    seoDescription: "A fake Windows 10 blue screen of death (BSOD) prank. Go fullscreen for the full effect -- nothing is actually wrong.",
    keywords: ["windows 10 blue screen", "windows 10 bsod prank", "fake blue screen", "windows error screen prank"],
    ogTitle: "Windows 10 Blue Screen Prank | ToolZoneX",
    ogDescription: "A fake Windows 10 blue screen of death (BSOD) prank. Go fullscreen for the full effect -- nothing is actually wrong.",
    schemaName: "Windows10BsodScreen",
    schemaDescription: "A fake Windows 10 blue screen of death (BSOD) prank. Go fullscreen for the full effect -- nothing is actually wrong.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: undefined,
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
