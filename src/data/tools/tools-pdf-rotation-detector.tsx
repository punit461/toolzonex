import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/tools/pdf-rotation-detector",
    navName: "PDF Rotation Detector",
    navDescription: "Check rotation angle of each PDF page.",
    name: "PDF Rotation Detector - Check PDF Page Rotation Online",
    description: "Detect the rotation angle (0°, 90°, 180°, or 270°) of every page in a PDF, with a grouped summary. Free, private, runs entirely in your browser.",
    navCategory: "PDF Tools",
    shellCategory: "Tools",
    icon: <PictureAsPdfIcon fontSize="large" color="primary"/>,
    seoTitle: "PDF Rotation Detector - Check PDF Page Rotation Online",
    seoDescription: "Free online PDF rotation detector. Check the rotation angle of every page in a PDF — 0°, 90°, 180°, or 270° — with grouped summaries.",
    keywords: ["pdf rotation", "check pdf rotation", "pdf page rotation", "pdf rotation detector"],
    ogTitle: "PDF Rotation Detector - Check PDF Page Rotation Online | ToolZoneX",
    ogDescription: "Detect the rotation angle of every page in a PDF, with a grouped summary.",
    schemaName: "PDF Rotation Detector",
    schemaDescription: "Detect the rotation angle of every page in a PDF.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "What does a 0° rotation mean?", answer: "The page is displayed upright, in its original orientation as defined in the PDF." }, { question: "What is the difference between 90° and 270°?", answer: "90° means the page was rotated one quarter-turn clockwise; 270° is equivalent to a 90° counter-clockwise rotation." }, { question: "Is my file uploaded anywhere?", answer: "No — rotation detection happens entirely in your browser; the PDF is never sent to a server." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
