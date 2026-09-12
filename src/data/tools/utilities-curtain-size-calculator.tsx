import WindowIcon from '@mui/icons-material/Window';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/curtain-size-calculator",
    navName: "Curtain Size Calculator",
    navDescription: "Find the right curtain fabric width.",
    name: "Curtain Size Calculator",
    description: "Calculate the total curtain fabric width and per-panel width needed for your window based on rod width and fullness.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <WindowIcon fontSize="large" color="primary"/>,
    seoTitle: "Curtain Size Calculator - Curtain Fabric Width Guide",
    seoDescription: "Free curtain size calculator. Find the total fabric width and per-panel width for your curtains based on rod width, fullness ratio, and panel count.",
    keywords: ["curtain size calculator", "curtain fabric width calculator", "curtain fullness calculator", "how much fabric for curtains", "curtain panel width calculator"],
    ogTitle: "Curtain Size Calculator - Curtain Fabric Width Guide | ToolZoneX",
    ogDescription: "Calculate the fabric width you need for full, well-draped curtains.",
    schemaName: "Curtain Size Calculator",
    schemaDescription: "Calculate total and per-panel curtain fabric width from rod width, fullness ratio, and number of panels.",
    applicationCategory: "UtilityApplication",
    currency: undefined,
    faqs: [{ question: "What fullness ratio should I use?", answer: "A ratio of 2x to 2.5x gives a standard, well-draped look suitable for most rooms. Lightweight sheers often look best at 2.5x-3x fullness, while heavier fabrics like velvet can look full even at 2x since the material itself has more body." }, { question: "Should I measure the rod width or the window width?", answer: "Use the rod width, not the window opening — curtain rods are usually mounted wider than the window frame so panels can fully clear the glass when open, and fabric width should be based on that actual mounted rod width." }, { question: "Does this account for fabric needed for hems and seams?", answer: "No — this calculates the finished, hung width only. Add extra fabric on top of this result for side hems, center seams if joining fabric widths, and pattern repeat matching if using a patterned fabric." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
