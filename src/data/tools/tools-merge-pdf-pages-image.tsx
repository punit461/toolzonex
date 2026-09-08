import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/tools/merge-pdf-pages-image",
    navName: "Merge PDF Pages into Single Image",
    navDescription: "Combine all PDF pages into one tall image.",
    name: "Merge PDF Pages into Single Image Online",
    description: "Merge all pages of a PDF into a single tall PNG image. Free, private, runs entirely in your browser.",
    navCategory: "PDF Tools",
    shellCategory: "Tools",
    icon: <PictureAsPdfIcon fontSize="large" color="primary"/>,
    seoTitle: "Merge PDF Pages into Single Image Online",
    seoDescription: "Merge all pages of a PDF into a single tall PNG image. Free, private, runs entirely in your browser.",
    keywords: ["merge pdf pages image", "pdf to single image", "combine pdf pages", "pdf strip image"],
    ogTitle: "Merge PDF Pages into Single Image Online | ToolZoneX",
    ogDescription: "Merge all pages of a PDF into a single tall PNG image. Free, private, runs entirely in your browser.",
    schemaName: "Merge PDF Pages into Single Image",
    schemaDescription: "Merge all pages of a PDF into a single tall PNG image.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "How wide is the output image?", answer: "Pages are rendered at 800 pixels wide with the original aspect ratio preserved." }, { question: "Is my file uploaded anywhere?", answer: "No — everything happens in your browser." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
