import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/tools/add-stamp-to-pdf-page",
    navName: "Add Stamp to PDF",
    navDescription: "Stamp text diagonally across every PDF page.",
    name: "Add Stamp to PDF Page Online Free",
    description: "Add a large diagonal stamp text (like CONFIDENTIAL, DRAFT, or APPROVED) to every page of a PDF. Free, private, runs entirely in your browser.",
    navCategory: "PDF Tools",
    shellCategory: "Tools",
    icon: <PictureAsPdfIcon fontSize="large" color="primary"/>,
    seoTitle: "Add Stamp to PDF Page Online Free",
    seoDescription: "Free online tool to add a stamp to every page of a PDF. Choose from preset stamps or enter custom text with color and opacity.",
    keywords: ["add stamp to pdf", "pdf stamp", "stamp pdf page", "pdf watermark stamp"],
    ogTitle: "Add Stamp to PDF Page Online Free | ToolZoneX",
    ogDescription: "Add a large diagonal stamp text to every page of a PDF. Free, private, runs entirely in your browser.",
    schemaName: "Add Stamp to PDF Page",
    schemaDescription: "Add a colored stamp text diagonally across every page of a PDF.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "How is this different from a watermark?", answer: "A stamp is typically larger, more opaque, and placed diagonally across the page center — it is designed to be highly visible rather than subtle." }, { question: "Can I use a different stamp on different pages?", answer: "Not yet — the same stamp text is applied to every page in the current version." }, { question: "Is my file uploaded anywhere?", answer: "No — stamping happens entirely in your browser." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
