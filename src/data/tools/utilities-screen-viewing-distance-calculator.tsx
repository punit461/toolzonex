import TvIcon from '@mui/icons-material/Tv';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/screen-viewing-distance-calculator",
    navName: "Screen Viewing Distance Calculator",
    navDescription: "Recommended TV viewing distance by resolution.",
    name: "Screen Viewing Distance Calculator",
    description: "Calculate a recommended viewing distance range for a screen based on its diagonal size and resolution (1080p, 4K, or 8K).",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <TvIcon fontSize="large" color="primary"/>,
    seoTitle: "Screen Viewing Distance Calculator - TV Distance by Resolution",
    seoDescription: "Free screen viewing distance calculator. Enter screen size and resolution to calculate a recommended TV viewing distance range.",
    keywords: ["screen viewing distance calculator", "tv viewing distance calculator", "4k viewing distance calculator", "tv distance calculator", "optimal tv viewing distance"],
    ogTitle: "Screen Viewing Distance Calculator - TV Distance by Resolution | ToolZoneX",
    ogDescription: "Calculate a recommended viewing distance range for a screen based on diagonal size and resolution.",
    schemaName: "Screen Viewing Distance Calculator",
    schemaDescription: "Calculate a recommended viewing distance range as screen diagonal times a resolution-specific multiplier range, converted to feet.",
    applicationCategory: "UtilityApplication",
    currency: undefined,
    faqs: [{ question: "Why is the recommended distance a range instead of one number?", answer: "Personal preference, eyesight, and content type (movies vs. fast-action gaming vs. detailed text) all shift the ideal distance within a reasonable range — these are commonly published guideline ranges, not a single precise number." }, { question: "Why can I sit closer to a 4K screen than a 1080p screen of the same size?", answer: "A 4K screen packs roughly 4 times as many pixels into the same physical area as 1080p, so pixels are much smaller and closer together — meaning your eye can be closer to the screen before those pixels become individually visible." }, { question: "Does this apply to computer monitors too?", answer: "The same underlying principle applies, but monitors are typically viewed much closer than TVs and often prioritize a wider field of view or higher pixel density for detailed work, so monitor-specific ergonomic guidelines may differ from these TV-oriented ranges." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
