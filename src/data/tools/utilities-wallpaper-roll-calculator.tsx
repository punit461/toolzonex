import LayersIcon from '@mui/icons-material/Layers';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/wallpaper-roll-calculator",
    navName: "Wallpaper Roll Calculator",
    navDescription: "Calculate usable coverage per roll.",
    name: "Wallpaper Roll Calculator",
    description: "Calculate the usable coverage area of a single wallpaper roll from its width, length, and a pattern-repeat waste allowance.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <LayersIcon fontSize="large" color="primary"/>,
    seoTitle: "Wallpaper Roll Calculator - Calculate Coverage Per Roll",
    seoDescription: "Free wallpaper roll calculator. Enter roll width, length, and waste allowance to calculate the usable coverage area of a single roll.",
    keywords: ["wallpaper roll calculator", "wallpaper roll coverage", "how much does a roll of wallpaper cover", "wallpaper roll size calculator"],
    ogTitle: "Wallpaper Roll Calculator - Calculate Coverage Per Roll | ToolZoneX",
    ogDescription: "Calculate the usable coverage area of a single wallpaper roll.",
    schemaName: "Wallpaper Roll Calculator",
    schemaDescription: "Calculate the usable coverage area of a single wallpaper roll from its width, length, and a pattern-repeat waste allowance.",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: [{ question: "How is this different from the main Wallpaper Calculator?", answer: "This tool only calculates the usable coverage of a single roll, as a quick reference. Our separate Wallpaper Calculator handles the full room job — wall perimeter, area, door/window cutouts, and total rolls needed — using a roll coverage figure like the one this tool produces." }, { question: "What waste allowance should I use?", answer: "Plain wallpaper with no pattern can use a low allowance (5-10%), while wallpaper with a large pattern repeat that needs careful matching between strips often needs 15-25% or more. Check the manufacturer's specific pattern repeat guidance when available." }, { question: "Why do roll dimensions vary between products?", answer: "Wallpaper isn't manufactured to one universal size — European rolls, American rolls, and specialty/designer wallpaper all commonly ship in different widths and lengths. Always check the specific product's label rather than assuming a standard size." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
