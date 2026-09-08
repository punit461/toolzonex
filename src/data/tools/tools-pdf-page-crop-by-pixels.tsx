import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/tools/pdf-page-crop-by-pixels",
    navName: "PDF Page Crop",
    navDescription: "Crop PDF pages by specifying margins in mm.",
    name: "PDF Page Crop by Pixels",
    description: "Crop PDF pages by removing margins from each edge. Enter crop values in mm. Free, private, runs entirely in your browser.",
    navCategory: "PDF Tools",
    shellCategory: "Tools",
    icon: <PictureAsPdfIcon fontSize="large" color="primary"/>,
    seoTitle: "PDF Page Crop by Pixels - Crop PDF Pages Online",
    seoDescription: "Crop PDF pages by removing margins from each edge online. Free, private, runs in your browser.",
    keywords: ["pdf crop", "crop pdf pages", "pdf page crop", "trim pdf margins"],
    ogTitle: "PDF Page Crop by Pixels | ToolZoneX",
    ogDescription: "Crop PDF pages by removing margins from each edge. Free, private, runs in your browser.",
    schemaName: "PdfPageCropByPixels",
    schemaDescription: "Crop PDF pages by removing margins from each edge.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "What units are used?", answer: "Enter crop values in millimeters. They are converted to PDF points internally." }, { question: "Is my file uploaded anywhere?", answer: "No — everything happens in your browser." }],
    isHub: false,
};

export default tool;
