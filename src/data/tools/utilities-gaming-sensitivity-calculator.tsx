import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/gaming-sensitivity-calculator",
    navName: "Gaming Sensitivity Calculator",
    navDescription: "Effective DPI (eDPI) and sensitivity matching.",
    name: "Gaming Sensitivity Calculator",
    description: "Calculate your effective DPI (eDPI) from mouse DPI and in-game sensitivity, and find the matching sensitivity for a different mouse DPI.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <SportsEsportsIcon fontSize="large" color="primary"/>,
    seoTitle: "Gaming Sensitivity Calculator - eDPI Calculator",
    seoDescription: "Free gaming sensitivity calculator. Calculate your effective DPI (eDPI) from mouse DPI and in-game sensitivity, and match your sensitivity across different mice or games.",
    keywords: ["gaming sensitivity calculator", "edpi calculator", "effective dpi calculator", "mouse sensitivity converter", "sensitivity matching calculator"],
    ogTitle: "Gaming Sensitivity Calculator - eDPI Calculator | ToolZoneX",
    ogDescription: "Calculate your effective DPI (eDPI) and match sensitivity across mice or games.",
    schemaName: "Gaming Sensitivity Calculator",
    schemaDescription: "Calculate effective DPI (eDPI) from mouse DPI and in-game sensitivity.",
    applicationCategory: "UtilityApplication",
    currency: undefined,
    faqs: [{ question: "Why does eDPI matter more than DPI alone?", answer: "DPI by itself only tells you how sensitive the mouse hardware is — the in-game sensitivity multiplier changes the actual feel on top of that. Two players at \"800 DPI\" can have wildly different aim speed if their in-game sensitivity differs, but the same eDPI always feels the same." }, { question: "Does eDPI transfer exactly between different games?", answer: "Mostly, but not perfectly — different game engines can apply their sensitivity multiplier slightly differently (some use raw input, others don't), so eDPI is a very close starting point rather than a guaranteed identical feel in every single game." }, { question: "What's a \"good\" eDPI?", answer: "There's no universal answer — competitive players commonly land somewhere in a wide range depending on playstyle and monitor size. Use eDPI to keep your own feel consistent, not to chase someone else's exact number." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
