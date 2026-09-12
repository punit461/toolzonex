import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/tools/change-pdf-text-color",
    navName: "Change PDF Text Color",
    navDescription: "Recolor dark text using a pixel-based approximation.",
    name: "Change PDF Text Color",
    description: "Shift dark text toward a new color using a pixel-based approximation — best for simple black-text-on-white pages. Not true vector text recoloring. Free, private, browser-based.",
    navCategory: "PDF Tools",
    shellCategory: "Tools",
    icon: <PictureAsPdfIcon fontSize="large" color="primary"/>,
    seoTitle: "Change PDF Text Color Online Free - Recolor PDF Text",
    seoDescription: "Free online tool to change PDF text color. Shift dark text toward a new color using a pixel-based approximation, entirely in your browser.",
    keywords: ["change pdf text color", "recolor pdf text", "change text color in pdf online", "pdf text color changer free", "edit pdf font color"],
    ogTitle: "Change PDF Text Color Online Free | ToolZoneX",
    ogDescription: "Shift dark text toward a new color using a pixel-based approximation — best for simple black-text-on-white pages.",
    schemaName: "Change PDF Text Color",
    schemaDescription: "Shift dark text toward a new color using a pixel-based approximation — best for simple black-text-on-white pages.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "Will my text still be selectable afterward?", answer: "No — every page is flattened into an image as part of this process, so the resulting PDF has no selectable, searchable, or copyable text." }, { question: "Will this work on colored or light-colored text?", answer: "Not well. The tool identifies \"text\" purely by brightness, so it only reliably targets dark text — light gray or colored text may be missed, or unrelated dark image content may get recolored instead." }, { question: "Can I recolor only some text, not all of it?", answer: "No — the color shift is applied uniformly to every sufficiently dark pixel on every page; there's no way to target specific words or sections." }, { question: "Is my file uploaded anywhere?", answer: "No — everything happens entirely in your browser." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
