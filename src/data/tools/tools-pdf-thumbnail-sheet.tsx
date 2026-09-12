import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/tools/pdf-thumbnail-sheet",
    navName: "PDF Thumbnail Sheet",
    navDescription: "Create a contact sheet of PDF pages.",
    name: "PDF Thumbnail Sheet - Create PDF Contact Sheet Online",
    description: "Generate a contact sheet showing all pages of a PDF as labelled thumbnails in a grid layout. Download as a single PNG image. Free, private, runs entirely in your browser.",
    navCategory: "PDF Tools",
    shellCategory: "Tools",
    icon: <PictureAsPdfIcon fontSize="large" color="primary"/>,
    seoTitle: "PDF Thumbnail Sheet - Create PDF Contact Sheet Online",
    seoDescription: "Free online PDF thumbnail sheet creator. Generate a visual contact sheet of all pages in a PDF as labelled thumbnails.",
    keywords: ["pdf thumbnail sheet", "pdf contact sheet", "pdf page thumbnails", "pdf preview sheet", "pdf index sheet", "pdf thumbnails grid"],
    ogTitle: "PDF Thumbnail Sheet - Create PDF Contact Sheet Online | ToolZoneX",
    ogDescription: "Generate a contact sheet of all pages as labelled thumbnails in a grid. Download as a single PNG image. Free, private, runs entirely in your browser.",
    schemaName: "PDF Thumbnail Sheet",
    schemaDescription: "Generate a contact sheet showing all pages of a PDF as labelled thumbnails in a grid layout.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "How many pages can it handle?", answer: "The tool renders every page, so very large PDFs (hundreds of pages) may take a while. For documents over ~100 pages the sheet will still be generated but may be slow." }, { question: "What resolution are the thumbnails?", answer: "Each thumbnail is rendered at 180 px wide with the aspect ratio preserved, scaled proportionally from the original page dimensions." }, { question: "Is my file uploaded anywhere?", answer: "No — rendering happens entirely in your browser." }],
    isHub: false,
    noindex: true,
};

export default tool;
