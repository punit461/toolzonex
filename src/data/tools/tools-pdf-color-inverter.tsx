import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/tools/pdf-color-inverter",
    navName: "PDF Color Inverter",
    navDescription: "Invert every color in a PDF like a photo negative.",
    name: "PDF Color Inverter",
    description: "Invert the colors of every page in a PDF, producing a photographic-negative effect. Free, private, runs entirely in your browser.",
    navCategory: "PDF Tools",
    shellCategory: "Tools",
    icon: <PictureAsPdfIcon fontSize="large" color="primary"/>,
    seoTitle: "PDF Color Inverter - Invert PDF Colors Online Free",
    seoDescription: "Free online PDF color inverter. Flip every page's colors into a photographic negative, entirely in your browser — no upload required.",
    keywords: ["pdf color inverter", "invert pdf colors", "pdf negative", "invert colors pdf online", "flip pdf colors"],
    ogTitle: "PDF Color Inverter Online Free | ToolZoneX",
    ogDescription: "Invert the colors of every page in a PDF, producing a photographic-negative effect.",
    schemaName: "PDF Color Inverter",
    schemaDescription: "Invert the colors of every page in a PDF, producing a photographic-negative effect.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "Will my text still be selectable afterward?", answer: "No. Inverting colors requires redrawing each page as an image, so all text and vector content becomes part of a flattened, non-selectable image." }, { question: "Does this just invert colors, or change brightness/contrast too?", answer: "Only colors are inverted (each RGB channel is flipped). Brightness and contrast are not otherwise adjusted." }, { question: "Is my file uploaded anywhere?", answer: "No — everything happens locally in your browser; the PDF is never sent to a server." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
