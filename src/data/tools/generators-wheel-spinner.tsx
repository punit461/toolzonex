import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/generators/wheel-spinner",
    navName: "Wheel Spinner",
    navDescription: "Quick random spin from a list.",
    name: "Wheel Spinner - Quick Random Spin",
    description: "Type a list of options and spin a simple wheel to pick one at random — a minimal, no-frills spinner with no setup required.",
    navCategory: "Generators",
    shellCategory: "Generators",
    icon: <DonutLargeIcon fontSize="large" color="primary"/>,
    seoTitle: "Wheel Spinner - Quick Random Spin Online Free",
    seoDescription: "Free online wheel spinner. Type a list of options and spin a simple wheel to pick one at random. No setup or customization needed.",
    keywords: ["wheel spinner", "random spinner", "spin wheel online", "quick random picker", "simple wheel spinner", "random choice wheel"],
    ogTitle: "Wheel Spinner - Quick Random Spin Online Free | ToolZoneX",
    ogDescription: "Type a list of options and spin a simple wheel to pick one at random.",
    schemaName: "Wheel Spinner",
    schemaDescription: "Spin a simple wheel built from a plain list of entries to pick one at random.",
    applicationCategory: "EntertainmentApplication",
    currency: "INR",
    faqs: [{ question: "How is this different from the Wheel of Fortune Spinner?", answer: "The Wheel of Fortune Spinner lets you add and remove entries one at a time, customize colors, and track spin stats. This tool is intentionally simpler — just paste or type a plain list of entries and spin, with no extra customization, for when you want the fastest possible random pick." }, { question: "Is the spin result random?", answer: "Yes — each spin lands on a random entry, with every entry given an equal chance based on its slice size." }, { question: "How many entries can I add?", answer: "There's no hard cap, but the wheel is easiest to read with a shorter list — a minimum of 2 entries is required to spin." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
