import WindowIcon from '@mui/icons-material/Window';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/window-area-calculator",
    navName: "Window Area Calculator",
    navDescription: "Total glazing area across multiple windows.",
    name: "Window Area Calculator",
    description: "Add multiple windows by width and height to calculate total window/glazing area for film, blinds, or glass replacement.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <WindowIcon fontSize="large" color="primary"/>,
    seoTitle: "Window Area Calculator - Total Glazing Area",
    seoDescription: "Free window area calculator. Add your windows' width and height to find total window area for film, blinds, or glass replacement.",
    keywords: ["window area calculator", "window glazing area calculator", "window film calculator area", "how much window film do i need", "window square footage calculator"],
    ogTitle: "Window Area Calculator - Total Glazing Area | ToolZoneX",
    ogDescription: "Calculate total window area across multiple windows.",
    schemaName: "Window Area Calculator",
    schemaDescription: "Calculate total window/glazing area from multiple windows' width and height.",
    applicationCategory: "UtilityApplication",
    currency: undefined,
    faqs: [{ question: "How is this different from the Curtain Size Calculator?", answer: "The Curtain Size Calculator figures out how wide to cut curtain fabric based on a fullness ratio applied to the rod width — it doesn't calculate area at all. This calculator instead measures the actual glazed area of the window itself, which is what you need for film, blinds, or glass, not fabric width." }, { question: "Should I measure the glass only, or the whole window frame?", answer: "It depends on what you're estimating for — use the visible glass area for film or tint, and the full frame opening (including the frame) for blinds or shades that mount inside the window recess." }, { question: "Does this account for waste when ordering film or glass?", answer: "No — this gives the raw total area only. Add a buffer of around 10% on top of the total when ordering film or glass to account for trimming, cutting mistakes, and irregular window shapes." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
