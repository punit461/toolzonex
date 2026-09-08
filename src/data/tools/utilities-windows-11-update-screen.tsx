import FullscreenIcon from '@mui/icons-material/Fullscreen';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/windows-11-update-screen",
    navName: "Windows 11 Update Screen",
    navDescription: "Fake Windows update prank.",
    name: "Windows 11 Update Screen",
    description: "A fake Windows 11 'Working on updates' screen prank. Go fullscreen for the full effect.",
    navCategory: "Screens",
    shellCategory: "Utilities",
    icon: <FullscreenIcon fontSize="large" color="primary"/>,
    seoTitle: "Windows 11 Update Screen Prank",
    seoDescription: "A fake Windows 11 'Working on updates' screen prank. Go fullscreen for the full effect.",
    keywords: ["windows 11 update screen", "fake windows 11 update", "windows update prank", "windows 11 update screen prank", "fake windows update prank"],
    ogTitle: "Windows 11 Update Screen Prank | ToolZoneX",
    ogDescription: "A fake Windows 11 'Working on updates' screen prank. Go fullscreen for the full effect.",
    schemaName: "Windows11UpdateScreen",
    schemaDescription: "A fake Windows 11 'Working on updates' screen prank. Go fullscreen for the full effect.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "Does this actually affect the computer?", answer: "No — it's just a fullscreen webpage that looks like a Windows update screen. Closing the tab or pressing Esc returns everything to normal instantly." }, { question: "Will this trigger a real restart or update?", answer: "No, nothing on the device is touched." }, { question: "How do I set up this windows 11 update screen prank on a coworker's PC?", answer: "Open this page on their screen while they're away, click \"Click to Fullscreen\" (or press F), and leave it running — the spinning \"Working on updates\" percentage looks convincing at a glance. Press Esc together to reveal the prank when they get back." }, { question: "Does the update percentage actually progress?", answer: "Yes — for visual realism, the percentage counter animates up and loops, just like a real Windows update screen, even though nothing is actually being installed." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
