import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/tools/add-pdf-border",
    navName: "Add Border to PDF",
    navDescription: "Add a coloured border to every PDF page.",
    name: "Add Border to PDF Pages Online Free",
    description: "Add a rectangular border to every page of a PDF. Choose border colour and thickness, then download the modified PDF. Free, private, runs entirely in your browser.",
    navCategory: "PDF Tools",
    shellCategory: "Tools",
    icon: <PictureAsPdfIcon fontSize="large" color="primary"/>,
    seoTitle: "Add Border to PDF Pages Online Free",
    seoDescription: "Free online tool to add a border to PDF pages. Choose colour and thickness, then download the modified PDF instantly.",
    keywords: ["add border to pdf", "pdf border tool", "add frame to pdf", "pdf border maker", "add outline to pdf"],
    ogTitle: "Add Border to PDF Pages Online Free | ToolZoneX",
    ogDescription: "Add a rectangular border to every page of a PDF. Choose colour and thickness, then download.",
    schemaName: "Add Border to PDF",
    schemaDescription: "Add a rectangular border to every page of a PDF.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "Can I choose a custom colour?", answer: "The tool offers black, gray, blue, and red. For other colours, use the PDF Editor tool after adding the border." }, { question: "Is my file uploaded anywhere?", answer: "No — all processing happens entirely in your browser; the PDF is never sent to a server." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
