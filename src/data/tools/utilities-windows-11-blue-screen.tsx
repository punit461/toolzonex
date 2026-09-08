import FullscreenIcon from '@mui/icons-material/Fullscreen';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/windows-11-blue-screen",
    navName: "Windows 11 Blue Screen",
    navDescription: "Fake error screen prank.",
    name: "Windows 11 Blue Screen",
    description: "A fake Windows 11 error screen prank. Go fullscreen for the full effect -- nothing is actually wrong.",
    navCategory: "Screens",
    shellCategory: "Utilities",
    icon: <FullscreenIcon fontSize="large" color="primary"/>,
    seoTitle: "Windows 11 Blue Screen Prank",
    seoDescription: "A fake Windows 11 error screen prank. Go fullscreen for the full effect -- nothing is actually wrong.",
    keywords: ["windows 11 blue screen", "windows 11 error screen prank", "fake windows 11 bsod"],
    ogTitle: "Windows 11 Blue Screen Prank | ToolZoneX",
    ogDescription: "A fake Windows 11 error screen prank. Go fullscreen for the full effect -- nothing is actually wrong.",
    schemaName: "Windows11BsodScreen",
    schemaDescription: "A fake Windows 11 error screen prank. Go fullscreen for the full effect -- nothing is actually wrong.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: undefined,
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
