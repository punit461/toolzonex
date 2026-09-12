import FullscreenIcon from '@mui/icons-material/Fullscreen';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/windows-10-update-screen",
    navName: "Windows 10 Update Screen",
    navDescription: "Fake Windows update prank.",
    name: "Windows 10 Update Screen",
    description: "A fake Windows 10 'Working on updates' screen prank. Go fullscreen for the full effect.",
    navCategory: "Screens",
    shellCategory: "Utilities",
    icon: <FullscreenIcon fontSize="large" color="primary"/>,
    seoTitle: "Windows 10 Update Screen Prank",
    seoDescription: "A fake Windows 10 'Working on updates' screen prank. Go fullscreen for the full effect.",
    keywords: ["windows 10 update screen", "fake windows update", "windows update prank"],
    ogTitle: "Windows 10 Update Screen Prank | ToolZoneX",
    ogDescription: "A fake Windows 10 'Working on updates' screen prank. Go fullscreen for the full effect.",
    schemaName: "Windows10UpdateScreen",
    schemaDescription: "A fake Windows 10 'Working on updates' screen prank. Go fullscreen for the full effect.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: undefined,
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
