import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/tools/reorder-pdf-pages",
    navName: "Reorder PDF Pages",
    navDescription: "Drag and drop to reorder pages.",
    name: "Reorder PDF Pages - Rearrange Page Order",
    description: "Drag and drop (or use arrow buttons) to rearrange the pages of a PDF into a new order. Free, private, runs entirely in your browser.",
    navCategory: "PDF Tools",
    shellCategory: "Tools",
    icon: <PictureAsPdfIcon fontSize="large" color="primary"/>,
    seoTitle: "Reorder PDF Pages - Rearrange PDF Page Order Free",
    seoDescription: "Free online tool to reorder PDF pages. Drag and drop thumbnails or use arrow buttons to rearrange a PDF's page order, then download the result.",
    keywords: ["reorder pdf pages", "rearrange pdf pages", "change pdf page order", "move pdf pages", "sort pdf pages"],
    ogTitle: "Reorder PDF Pages - Rearrange PDF Page Order Free | ToolZoneX",
    ogDescription: "Drag and drop (or use arrow buttons) to rearrange the pages of a PDF into a new order.",
    schemaName: "Reorder PDF Pages",
    schemaDescription: "Rearrange the page order of a PDF via drag-and-drop thumbnails or move buttons.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "Does this delete or rotate pages too?", answer: "No — this tool only changes page order. For deleting, rotating, or combining pages, use the Delete PDF Pages, Rotate PDF, or PDF Editor tools." }, { question: "Is there a page limit?", answer: "No hard limit, but very large PDFs take longer to render thumbnails for since everything runs in your browser." }, { question: "Is my file uploaded anywhere?", answer: "No — reordering happens entirely in your browser; the PDF is never sent to a server." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
