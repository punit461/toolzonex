import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/tools/resize-pdf-pages",
    navName: "Resize PDF Pages",
    navDescription: "Change PDF page size to custom dimensions.",
    name: "Resize PDF Pages - Change PDF Page Size Online Free",
    description: "Resize all pages of a PDF to any custom width and height in millimetres. Free, private, runs entirely in your browser.",
    navCategory: "PDF Tools",
    shellCategory: "Tools",
    icon: <PictureAsPdfIcon fontSize="large" color="primary"/>,
    seoTitle: "Resize PDF Pages - Change PDF Page Size Online Free",
    seoDescription: "Free online PDF page resizer. Change the page size of any PDF to custom dimensions in millimetres. A4, Letter, Legal, or any size.",
    keywords: ["resize pdf pages", "change pdf page size", "pdf resizer", "resize pdf to a4", "pdf page size changer", "custom pdf size"],
    ogTitle: "Resize PDF Pages - Change PDF Page Size Online Free | ToolZoneX",
    ogDescription: "Resize all pages of a PDF to any custom width and height. Free, private, runs entirely in your browser.",
    schemaName: "Resize PDF Pages",
    schemaDescription: "Resize all pages of a PDF to any custom dimensions in millimetres.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "What are common page sizes in millimetres?", answer: "A4 is 210 × 297 mm, US Letter is 215.9 × 279.4 mm, US Legal is 215.9 × 355.6 mm." }, { question: "Will my text reflow?", answer: "No — the page canvas is resized but content is not reflowed. Very large size changes may cause content to appear near or off the edges." }, { question: "Is my file uploaded anywhere?", answer: "No — resizing happens entirely in your browser." }],
    isHub: false,
};

export default tool;
