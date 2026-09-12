import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/tools/detect-blank-pages",
    navName: "Detect Blank Pages",
    navDescription: "Find blank or empty pages in a PDF.",
    name: "Detect Blank Pages in PDF Online Free",
    description: "Analyse a PDF to identify blank pages with no text or images. Shows a detailed report per page. Free, private, runs entirely in your browser.",
    navCategory: "PDF Tools",
    shellCategory: "Tools",
    icon: <PictureAsPdfIcon fontSize="large" color="primary"/>,
    seoTitle: "Detect Blank Pages in PDF Online Free",
    seoDescription: "Free online tool to detect blank pages in a PDF. Analyse each page for text and image content and get a detailed report.",
    keywords: ["detect blank pages pdf", "find empty pages pdf", "pdf blank page detector", "check blank pages"],
    ogTitle: "Detect Blank Pages in PDF Online Free | ToolZoneX",
    ogDescription: "Analyse a PDF to identify blank pages. Free, private, runs entirely in your browser.",
    schemaName: "Detect Blank Pages",
    schemaDescription: "Analyse a PDF to identify blank pages with no text or images.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "How does it define \"blank\"?", answer: "A page is blank if it has no text content and the rendered image is more than 98% white pixels. Pages with images but no text are reported as not blank." }, { question: "Does this modify my PDF?", answer: "No — this is a read-only analysis tool. No changes are made to the file." }, { question: "Is my file uploaded anywhere?", answer: "No — analysis runs entirely in your browser." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
