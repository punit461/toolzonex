import FormatPaintIcon from '@mui/icons-material/FormatPaint';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/wallpaper-calculator",
    navName: "Wallpaper Calculator",
    navDescription: "Calculate rolls needed for a room.",
    name: "Wallpaper Calculator",
    description: "Calculate how many rolls of wallpaper are needed for a room based on wall perimeter, height, and door/window cutouts.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <FormatPaintIcon fontSize="large" color="primary"/>,
    seoTitle: "Wallpaper Calculator - Calculate Rolls Needed for a Room",
    seoDescription: "Free wallpaper calculator. Enter room dimensions and wall height to calculate how many rolls of wallpaper you need for your project.",
    keywords: ["wallpaper calculator", "how much wallpaper do i need", "wallpaper rolls calculator", "wallpaper estimator", "room wallpaper calculator"],
    ogTitle: "Wallpaper Calculator - Calculate Rolls Needed for a Room | ToolZoneX",
    ogDescription: "Calculate how many rolls of wallpaper you need for a room.",
    schemaName: "Wallpaper Calculator",
    schemaDescription: "Calculate how many rolls of wallpaper are needed for a room based on wall perimeter, height, and door/window cutouts.",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: [{ question: "Why is usable coverage less than the roll's full size?", answer: "Most wallpaper rolls have a nominal size larger than what you can actually use, since pattern matching between strips, trimming at ceiling and floor lines, and waste from mistakes all reduce the effective coverage. A common rule of thumb is around 30 sq ft of usable coverage per single roll, though busier repeat patterns waste more." }, { question: "Should I round up or buy extra rolls?", answer: "Yes — this calculator already rounds up to the next whole roll, but many installers recommend buying one extra roll beyond that for touch-ups, mistakes, or future repairs, especially for patterns that may be discontinued later." }, { question: "Does this account for the wallpaper pattern repeat?", answer: "Not directly — pattern repeat waste is folded into the \"usable coverage per roll\" figure you enter. Wallpapers with a large pattern repeat need a lower usable-coverage estimate than plain or small-repeat patterns; check the manufacturer's specific pattern repeat guidance when available." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
