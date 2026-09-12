import FullscreenIcon from '@mui/icons-material/Fullscreen';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/blue-screen",
    navName: "Blue Screen",
    navDescription: "Plain fullscreen blue.",
    name: "Blue Screen",
    description: "A simple fullscreen blue screen. Free online blue screen for testing, backgrounds, or fun.",
    navCategory: "Screens",
    shellCategory: "Utilities",
    icon: <FullscreenIcon fontSize="large" color="primary"/>,
    seoTitle: "Blue Screen - Free Fullscreen Blue Display",
    seoDescription: "A simple fullscreen blue screen. Free online blue screen for testing, backgrounds, or fun. Looking for a Blue Screen of Death prank instead? See our dedicated BSOD tool.",
    keywords: ["blue screen", "blue screen test", "fullscreen blue", "plain blue screen", "custom blue screen of death", "fake blue screen prank"],
    ogTitle: "Blue Screen - Free Fullscreen Blue Display | ToolZoneX",
    ogDescription: "A simple fullscreen blue screen. Free online blue screen for testing, backgrounds, or fun.",
    schemaName: "BlueScreen",
    schemaDescription: "A simple fullscreen blue screen. Free online blue screen for testing, backgrounds, or fun.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "Does this work on mobile?", answer: "Yes, tap the fullscreen button on any phone or tablet browser." }, { question: "Will the color look exactly the same on every screen?", answer: "Not necessarily — color rendering varies by display, brightness settings, and color profile." }, { question: "Is this a Blue Screen of Death (BSOD) prank simulator?", answer: "No — this page is a plain, solid blue fullscreen display, not a fake Windows error message. If you're looking for a custom blue screen of death or a fake blue screen prank with actual Windows-style error text, use our dedicated Windows Blue Screen prank tool instead, which mimics the real \"Your PC ran into a problem\" screen." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
