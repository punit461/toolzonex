import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/tools/pdf-orientation-detector",
    navName: "PDF Orientation Detector",
    navDescription: "Check if PDF pages are portrait or landscape.",
    name: "PDF Orientation Detector - Check if PDF is Portrait or Landscape",
    description: "Detect whether each page in a PDF is portrait (taller than wide) or landscape (wider than tall), with a per-page breakdown and summary count. Free, private, runs entirely in your browser.",
    navCategory: "PDF Tools",
    shellCategory: "Tools",
    icon: <PictureAsPdfIcon fontSize="large" color="primary"/>,
    seoTitle: "PDF Orientation Detector - Check if PDF is Portrait or Landscape",
    seoDescription: "Free online PDF orientation detector. Check whether each page in a PDF is portrait or landscape, with per-page details.",
    keywords: ["pdf orientation", "portrait or landscape pdf", "pdf page orientation", "check pdf orientation"],
    ogTitle: "PDF Orientation Detector - Check if PDF is Portrait or Landscape | ToolZoneX",
    ogDescription: "Detect whether each page in a PDF is portrait or landscape, with a per-page breakdown.",
    schemaName: "PDF Orientation Detector",
    schemaDescription: "Detect whether each page in a PDF is portrait or landscape.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "What if width equals height?", answer: "A perfectly square page (e.g. 500 x 500 pt) is classified as Portrait since it is not wider than it is tall." }, { question: "Does this account for rotation?", answer: "This tool checks the page's intrinsic dimensions, not any rotation metadata. If you need to check applied rotations, use the Rotation Detector instead." }, { question: "Is my file uploaded anywhere?", answer: "No — detection happens entirely in your browser; the PDF is never sent to a server." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
