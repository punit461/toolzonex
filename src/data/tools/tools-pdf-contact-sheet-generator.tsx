import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/tools/pdf-contact-sheet-generator",
    navName: "PDF Contact Sheet",
    navDescription: "Create a grid of page thumbnails from a PDF.",
    name: "PDF Contact Sheet Generator",
    description: "Generate a contact sheet with thumbnails of every page in a PDF. Choose grid layout. Free, private, runs entirely in your browser.",
    navCategory: "PDF Tools",
    shellCategory: "Tools",
    icon: <PictureAsPdfIcon fontSize="large" color="primary"/>,
    seoTitle: "PDF Contact Sheet Generator - Create PDF Contact Sheet Online",
    seoDescription: "Generate a contact sheet with thumbnails of every page in a PDF. Free, private, runs in your browser.",
    keywords: ["pdf contact sheet", "pdf thumbnail sheet", "pdf page grid", "pdf overview"],
    ogTitle: "PDF Contact Sheet Generator | ToolZoneX",
    ogDescription: "Generate a contact sheet with thumbnails of every page in a PDF. Free, private, runs in your browser.",
    schemaName: "PdfContactSheetGenerator",
    schemaDescription: "Generate a contact sheet with thumbnails of every page in a PDF.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "Can I download the contact sheet?", answer: "Yes, use the Download button to save the contact sheet as a PNG image." }, { question: "Is my file uploaded anywhere?", answer: "No — everything happens in your browser." }],
    isHub: false,
    noindex: true,
};

export default tool;
