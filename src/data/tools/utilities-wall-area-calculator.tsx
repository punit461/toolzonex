import CropSquareIcon from '@mui/icons-material/CropSquare';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/wall-area-calculator",
    navName: "Wall Area Calculator",
    navDescription: "Calculate net paintable wall area minus openings.",
    name: "Wall Area Calculator - Net Paintable Area",
    description: "Calculate net wall area from multiple wall dimensions minus door and window openings.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <CropSquareIcon fontSize="large" color="primary"/>,
    seoTitle: "Wall Area Calculator - Net Paintable Area",
    seoDescription: "Free wall area calculator. Add wall dimensions and subtract doors/windows to get the net paintable or usable wall area.",
    keywords: ["wall area calculator", "paintable wall area calculator", "wall square footage calculator", "how to calculate wall area", "drywall area calculator"],
    ogTitle: "Wall Area Calculator | ToolZoneX",
    ogDescription: "Calculate net paintable wall area minus doors and windows.",
    schemaName: "Wall Area Calculator",
    schemaDescription: "Calculate net wall area from multiple wall dimensions minus door and window openings.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "Should I subtract windows and doors from the total?", answer: "Yes, for the most accurate paint, wallpaper, or material estimate — you generally don't need material to cover door and window openings. If you also plan to paint the door and window frames or trim, add a smaller separate allowance for those surfaces." }, { question: "What if the net area comes out to zero?", answer: "A net area of zero means the total opening area you entered equals or exceeds the total wall area, which usually signals a data entry issue — double-check that your wall and opening dimensions are correct and in the same units." }, { question: "Can I use this for multiple rooms at once?", answer: "Yes — just add a row for every wall across every room you're covering, and a row for every door or window throughout, and the calculator totals everything together into one combined net area." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
