import HeightIcon from '@mui/icons-material/Height';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/tools/height-comparison",
    navName: "Height Comparison",
    navDescription: "Compare heights with scaled bars.",
    name: "Height Comparison Tool",
    description: "Compare heights side by side with proportional scaled bars. Free online height comparison tool.",
    navCategory: "Tools",
    shellCategory: "Tools",
    icon: <HeightIcon fontSize="large" color="primary"/>,
    seoTitle: "Height Comparison Tool - Compare Heights Online Free",
    seoDescription: "Compare heights side by side with proportional scaled bars. Free online height comparer for people, animals, vehicles, and objects.",
    keywords: ["height comparison", "height comparison chart", "compare heights online", "height comparison tool", "height comparer", "compare height", "height comparison website", "size proportions", "comparing size", "size comparison maker online", "female and male height comparison", "height comperison", "high comparison"],
    ogTitle: "Height Comparison Tool - Compare Heights Online Free | ToolZoneX",
    ogDescription: "Compare heights side by side with proportional scaled bars. Free online height comparison tool.",
    schemaName: "HeightComparison",
    schemaDescription: "Compare heights side by side with proportional scaled bars. Free online height comparison tool.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "Can I add more than two people?", answer: "Yes, add as many as you like with the Add Person button — there's no limit on entries." }, { question: "Where do the preset reference heights come from?", answer: "They're commonly cited average/reference figures, included for quick comparisons — not exact measurements of any specific individual." }, { question: "Can I see centimeters and feet/inches at the same time?", answer: "Yes — the chart always shows both a cm axis and a ft/in axis together, regardless of which unit you're typing values in." }, { question: "Can I compare average female and male height side by side?", answer: "Yes — search the preset library for \"Average Adult Female\" and \"Average Adult Male\" (US and World averages are both included), add them both to the chart, and the tool renders a female and male height comparison with proportionally scaled bars." }, { question: "Is this the same as a general size comparison maker?", answer: "This tool focuses specifically on height (vertical size), not full 2D/3D size or scale comparisons — it works as a height comparison website for people, animals, vehicles, and objects, using proportionally scaled bars rather than silhouette overlays." }, { question: "Do I need to create an account?", answer: "No. The tool is free and works entirely in your browser — nothing is saved or uploaded unless you choose to download the PNG." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
